import { Logger } from './Logger';
import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { InvalidStateError } from './errors';
import { MediaKind, RtpParameters } from './RtpParameters';

const logger = new Logger('Consumer');

export type ConsumerOptions =
{
	id?: string;
	producerId?: string;
	kind?: 'audio' | 'video';
	rtpParameters: RtpParameters;
	streamId?: string;
	appData?: Record<string, unknown>;
};

export type ConsumerEvents =
{
	transportclose: [];
	trackended: [];
	// Private events.
	'@getstats': [(stats: RTCStatsReport) => void, (error: Error) => void];
	'@close': [];
	'@pause': [];
	'@resume': [];
};

export type ConsumerObserverEvents =
{
	close: [];
	pause: [];
	resume: [];
	trackended: [];
};

export class Consumer extends EnhancedEventEmitter<ConsumerEvents>
{
	// Id.
	private readonly _id: string;
	// Local id.
	private readonly _localId: string;
	// Associated Producer id.
	private readonly _producerId: string;
	// Closed flag.
	private _closed = false;
	// Associated RTCRtpReceiver.
	private readonly _rtpReceiver?: RTCRtpReceiver;
	// Remote track.
	private readonly _track: MediaStreamTrack;
	// RTP parameters.
	private readonly _rtpParameters: RtpParameters;
	// Paused flag.
	private _paused: boolean;
	// App custom data.
	private readonly _appData: Record<string, unknown>;
	// Observer instance.
	protected readonly _observer = new EnhancedEventEmitter<ConsumerObserverEvents>();

	constructor(
		{
			id,
			localId,
			producerId,
			rtpReceiver,
			track,
			rtpParameters,
			appData
		}:
		{
			id: string;
			localId: string;
			producerId: string;
			rtpReceiver?: RTCRtpReceiver;
			track: MediaStreamTrack;
			rtpParameters: RtpParameters;
			appData?: Record<string, unknown>;
		}
	)
	{
		super();

		logger.debug('constructor()');

		this._id = id;
		this._localId = localId;
		this._producerId = producerId;
		this._rtpReceiver = rtpReceiver;
		this._track = track;
		this._rtpParameters = rtpParameters;
		this._paused = !track.enabled;
		this._appData = appData || {};
		this.onTrackEnded = this.onTrackEnded.bind(this);

		this.handleTrack();
	}

	/**
	 * Consumer id.
	 */
	get id(): string
	{
		return this._id;
	}

	/**
	 * Local id.
	 */
	get localId(): string
	{
		return this._localId;
	}

	/**
	 * Associated Producer id.
	 */
	get producerId(): string
	{
		return this._producerId;
	}

	/**
	 * Whether the Consumer is closed.
	 */
	get closed(): boolean
	{
		return this._closed;
	}

	/**
	 * Media kind.
	 */
	get kind(): MediaKind
	{
		return this._track.kind as MediaKind;
	}

	/**
	 * Associated RTCRtpReceiver.
	 */
	get rtpReceiver(): RTCRtpReceiver | undefined
	{
		return this._rtpReceiver;
	}

	/**
	 * The associated track.
	 */
	get track(): MediaStreamTrack
	{
		return this._track;
	}

	/**
	 * RTP parameters.
	 */
	get rtpParameters(): RtpParameters
	{
		return this._rtpParameters;
	}

	/**
	 * Whether the Consumer is paused.
	 */
	get paused(): boolean
	{
		return this._paused;
	}

	/**
	 * App custom data.
	 */
	get appData(): Record<string, unknown>
	{
		return this._appData;
	}

	/**
	 * Invalid setter.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	set appData(appData: Record<string, unknown>)
	{
		throw new Error('cannot override appData object');
	}

	get observer(): EnhancedEventEmitter
	{
		return this._observer;
	}

	/**
	 * Closes the Consumer.
	 */
	close(): void
	{
		if (this._closed)
			return;

		logger.debug('close()');

		this._closed = true;

		this.destroyTrack();

		this.emit('@close');

		// Emit observer event.
		this._observer.safeEmit('close');
	}

	/**
	 * Transport was closed.
	 */
	transportClosed(): void
	{
		if (this._closed)
			return;

		logger.debug('transportClosed()');

		this._closed = true;

		this.destroyTrack();

		this.safeEmit('transportclose');

		// Emit observer event.
		this._observer.safeEmit('close');
	}

	/**
	 * Get associated RTCRtpReceiver stats.
	 */
	async getStats(): Promise<RTCStatsReport>
	{
		if (this._closed)
			throw new InvalidStateError('closed');

		return new Promise<RTCStatsReport>((resolve, reject) =>
		{
			this.safeEmit(
				'@getstats',
				resolve,
				reject
			);
		});
	}

	/**
	 * Pauses receiving media.
	 */
	pause(): void
	{
		logger.debug('pause()');

		if (this._closed)
		{
			logger.error('pause() | Consumer closed');

			return;
		}

		if (this._paused)
		{
			logger.debug('pause() | Consumer is already paused');

			return;
		}

		this._paused = true;
		this._track.enabled = false;

		this.emit('@pause');

		// Emit observer event.
		this._observer.safeEmit('pause');
	}

	/**
	 * Resumes receiving media.
	 */
	resume(): void
	{
		logger.debug('resume()');

		if (this._closed)
		{
			logger.error('resume() | Consumer closed');

			return;
		}

		if (!this._paused)
		{
			logger.debug('resume() | Consumer is already resumed');

			return;
		}

		this._paused = false;
		this._track.enabled = true;

		this.emit('@resume');

		// Emit observer event.
		this._observer.safeEmit('resume');
	}

	private onTrackEnded(): void
	{
		logger.debug('track "ended" event');

		this.safeEmit('trackended');

		// Emit observer event.
		this._observer.safeEmit('trackended');
	}

	private handleTrack(): void
	{
		this._track.addEventListener('ended', this.onTrackEnded);
	}

	private destroyTrack(): void
	{
		try
		{
			this._track.removeEventListener('ended', this.onTrackEnded);
			this._track.stop();
		}
		catch (error)
		{}
	}
}
