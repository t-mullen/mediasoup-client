import uuidv4 from 'uuid/v4';
import * as mediasoupClient from '../';

export function generateRouterRtpCapabilities(): mediasoupClient.types.RtpCapabilities
{
	return {
		codecs :
		[
			{
				mimeType             : 'audio/opus',
				kind                 : 'audio',
				preferredPayloadType : 100,
				clockRate            : 48000,
				channels             : 2,
				rtcpFeedback         :
				[
					{ type: 'transport-cc' }
				],
				parameters :
				{
					useinbandfec : 1,
					foo          : 'bar'
				}
			},
			{
				mimeType             : 'video/VP8',
				kind                 : 'video',
				preferredPayloadType : 101,
				clockRate            : 90000,
				rtcpFeedback         :
				[
					{ type: 'nack' },
					{ type: 'nack', parameter: 'pli' },
					{ type: 'ccm', parameter: 'fir' },
					{ type: 'goog-remb' },
					{ type: 'transport-cc' }
				],
				parameters :
				{
					'x-google-start-bitrate' : 1500
				}
			},
			{
				mimeType             : 'video/rtx',
				kind                 : 'video',
				preferredPayloadType : 102,
				clockRate            : 90000,
				rtcpFeedback         : [],
				parameters           :
				{
					apt : 101
				}
			},
			{
				mimeType             : 'video/H264',
				kind                 : 'video',
				preferredPayloadType : 103,
				clockRate            : 90000,
				rtcpFeedback         :
				[
					{ type: 'nack' },
					{ type: 'nack', parameter: 'pli' },
					{ type: 'ccm', parameter: 'fir' },
					{ type: 'goog-remb' },
					{ type: 'transport-cc' }
				],
				parameters :
				{
					'level-asymmetry-allowed' : 1,
					'packetization-mode'      : 1,
					'profile-level-id'        : '42e01f'
				}
			},
			{
				mimeType             : 'video/rtx',
				kind                 : 'video',
				preferredPayloadType : 104,
				clockRate            : 90000,
				rtcpFeedback         : [],
				parameters           :
				{
					apt : 103
				}
			}
		],
		headerExtensions :
		[
			{
				kind             : 'audio',
				uri              : 'urn:ietf:params:rtp-hdrext:sdes:mid',
				preferredId      : 1,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'urn:ietf:params:rtp-hdrext:sdes:mid',
				preferredId      : 1,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id',
				preferredId      : 2,
				preferredEncrypt : false,
				direction        : 'recvonly'
			},
			{
				kind             : 'video',
				uri              : 'urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id',
				preferredId      : 3,
				preferredEncrypt : false,
				direction        : 'recvonly'
			},
			{
				kind             : 'audio',
				uri              : 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time',
				preferredId      : 4,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time',
				preferredId      : 4,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'audio',
				uri              : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
				preferredId      : 5,
				preferredEncrypt : false,
				direction        : 'recvonly'
			},
			{
				kind             : 'video',
				uri              : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
				preferredId      : 5,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07',
				preferredId      : 6,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'urn:ietf:params:rtp-hdrext:framemarking',
				preferredId      : 7,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'audio',
				uri              : 'urn:ietf:params:rtp-hdrext:ssrc-audio-level',
				preferredId      : 10,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'urn:3gpp:video-orientation',
				preferredId      : 11,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			},
			{
				kind             : 'video',
				uri              : 'urn:ietf:params:rtp-hdrext:toffset',
				preferredId      : 12,
				preferredEncrypt : false,
				direction        : 'sendrecv'
			}
		]
	};
}

export function generateNativeRtpCapabilities(): mediasoupClient.types.RtpCapabilities
{
	return {
		codecs :
		[
			{
				mimeType             : 'audio/opus',
				kind                 : 'audio',
				preferredPayloadType : 111,
				clockRate            : 48000,
				channels             : 2,
				rtcpFeedback         :
				[
					{ type: 'transport-cc' }
				],
				parameters :
				{
					minptime     : 10,
					useinbandfec : 1
				}
			},
			{
				mimeType             : 'audio/ISAC',
				kind                 : 'audio',
				preferredPayloadType : 103,
				clockRate            : 16000,
				channels             : 1,
				rtcpFeedback         :
				[
					{ type: 'transport-cc' }
				],
				parameters : {}
			},
			{
				mimeType             : 'audio/CN',
				kind                 : 'audio',
				preferredPayloadType : 106,
				clockRate            : 32000,
				channels             : 1,
				rtcpFeedback         :
				[
					{ type: 'transport-cc' }
				],
				parameters : {}
			},
			{
				mimeType             : 'video/VP8',
				kind                 : 'video',
				preferredPayloadType : 96,
				clockRate            : 90000,
				rtcpFeedback         :
				[
					{ type: 'goog-remb' },
					{ type: 'transport-cc' },
					{ type: 'ccm', parameter: 'fir' },
					{ type: 'nack' },
					{ type: 'nack', parameter: 'pli' }
				],
				parameters :
				{
					baz : '1234abcd'
				}
			},
			{
				mimeType             : 'video/rtx',
				kind                 : 'video',
				preferredPayloadType : 97,
				clockRate            : 90000,
				rtcpFeedback         : [],
				parameters           :
				{
					apt : 96
				}
			}
		],
		headerExtensions :
		[
			{
				kind        : 'audio',
				uri         : 'urn:ietf:params:rtp-hdrext:sdes:mid',
				preferredId : 1
			},
			{
				kind        : 'video',
				uri         : 'urn:ietf:params:rtp-hdrext:sdes:mid',
				preferredId : 1
			},
			{
				kind        : 'video',
				uri         : 'urn:ietf:params:rtp-hdrext:toffset',
				preferredId : 2
			},
			{
				kind        : 'video',
				uri         : 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time',
				preferredId : 3
			},
			{
				kind        : 'video',
				uri         : 'urn:3gpp:video-orientation',
				preferredId : 4
			},
			{
				kind        : 'video',
				uri         : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
				preferredId : 5
			},
			{
				kind        : 'video',
				uri         : 'http://www.webrtc.org/experiments/rtp-hdrext/playout-delay',
				preferredId : 6
			},
			{
				kind        : 'video',
				uri         : 'http://www.webrtc.org/experiments/rtp-hdrext/video-content-type',
				preferredId : 7
			},
			{
				kind        : 'video',
				uri         : 'http://www.webrtc.org/experiments/rtp-hdrext/video-timing',
				preferredId : 8
			},
			{
				kind        : 'audio',
				uri         : 'urn:ietf:params:rtp-hdrext:ssrc-audio-level',
				preferredId : 10
			}
		]
	};
}

export function generateNativeSctpCapabilities(): mediasoupClient.types.SctpCapabilities
{
	return {
		numStreams : { OS: 2048, MIS: 2048 }
	};
}

export function generateLocalDtlsParameters(): mediasoupClient.types.DtlsParameters
{
	return {
		fingerprints :
		[
			{
				algorithm : 'sha-256',
				value     : '82:5A:68:3D:36:C3:0A:DE:AF:E7:32:43:D2:88:83:57:AC:2D:65:E5:80:C4:B6:FB:AF:1A:A0:21:9F:6D:0C:AD'
			}
		],
		role : 'auto'
	};
}

export function generateTransportRemoteParameters():
	mediasoupClient.types.TransportOptions
{
	return {
		id            : uuidv4(),
		iceParameters :
		{
			iceLite          : true,
			password         : 'yku5ej8nvfaor28lvtrabcx0wkrpkztz',
			usernameFragment : 'h3hk1iz6qqlnqlne'
		},
		iceCandidates :
		[
			{
				foundation : 'udpcandidate',
				ip         : '9.9.9.9',
				port       : 40533,
				priority   : 1078862079,
				protocol   : 'udp',
				type       : 'host',
				tcpType    : 'passive'
			},
			{
				foundation : 'udpcandidate',
				ip         : '9:9:9:9:9:9',
				port       : 41333,
				priority   : 1078862089,
				protocol   : 'udp',
				type       : 'host',
				tcpType    : 'passive'
			}
		],
		dtlsParameters :
		{
			fingerprints :
			[
				{
					algorithm : 'sha-256',
					value     : 'A9:F4:E0:D2:74:D3:0F:D9:CA:A5:2F:9F:7F:47:FA:F0:C4:72:DD:73:49:D0:3B:14:90:20:51:30:1B:90:8E:71'
				},
				{
					algorithm : 'sha-384',
					value     : '03:D9:0B:87:13:98:F6:6D:BC:FC:92:2E:39:D4:E1:97:32:61:30:56:84:70:81:6E:D1:82:97:EA:D9:C1:21:0F:6B:C5:E7:7F:E1:97:0C:17:97:6E:CF:B3:EF:2E:74:B0'
				},
				{
					algorithm : 'sha-512',
					value     : '84:27:A4:28:A4:73:AF:43:02:2A:44:68:FF:2F:29:5C:3B:11:9A:60:F4:A8:F0:F5:AC:A0:E3:49:3E:B1:34:53:A9:85:CE:51:9B:ED:87:5E:B8:F4:8E:3D:FA:20:51:B8:96:EE:DA:56:DC:2F:5C:62:79:15:23:E0:21:82:2B:2C'
				}
			],
			role : 'auto'
		},
		sctpParameters :
		{
			port           : 5000,
			OS             : 2048,
			MIS            : 2048,
			maxMessageSize : 2000000
		}
	};
}

export function generateProducerRemoteParameters(): { id: string }
{
	return {
		id : uuidv4()
	};
}

export function generateConsumerRemoteParameters(
	{ id, codecMimeType }:
	{ id?: string; codecMimeType?: string } = {}
): mediasoupClient.types.ConsumerOptions
{
	switch (codecMimeType)
	{
		case 'audio/opus':
		{
			return {
				id            : id || uuidv4(),
				producerId    : uuidv4(),
				kind          : 'audio',
				rtpParameters :
				{
					codecs :
					[
						{
							mimeType     : 'audio/opus',
							payloadType  : 100,
							clockRate    : 48000,
							channels     : 2,
							rtcpFeedback :
							[
								{ type: 'transport-cc' }
							],
							parameters :
							{
								useinbandfec : 1,
								foo          : 'bar'
							}
						}
					],
					encodings :
					[
						{
							ssrc : 46687003
						}
					],
					headerExtensions :
					[
						{
							uri : 'urn:ietf:params:rtp-hdrext:sdes:mid',
							id  : 1
						},
						{
							uri : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
							id  : 5
						},
						{
							uri : 'urn:ietf:params:rtp-hdrext:ssrc-audio-level',
							id  : 10
						}
					],
					rtcp :
					{
						cname       : 'wB4Ql4lrsxYLjzuN',
						reducedSize : true,
						mux         : true
					}
				}
			};
		}

		case 'audio/ISAC':
		{
			return {
				id            : id || uuidv4(),
				producerId    : uuidv4(),
				kind          : 'audio',
				rtpParameters :
				{
					codecs :
					[
						{
							mimeType     : 'audio/ISAC',
							payloadType  : 111,
							clockRate    : 16000,
							channels     : 1,
							rtcpFeedback :
							[
								{ type: 'transport-cc' }
							],
							parameters : {}
						}
					],
					encodings :
					[
						{
							ssrc : 46687004
						}
					],
					headerExtensions :
					[
						{
							uri : 'urn:ietf:params:rtp-hdrext:sdes:mid',
							id  : 1
						},
						{
							uri : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
							id  : 5
						}
					],
					rtcp :
					{
						cname       : 'wB4Ql4lrsxYLjzuN',
						reducedSize : true,
						mux         : true
					}
				}
			};
		}

		case 'video/VP8':
		{
			return {
				id            : id || uuidv4(),
				producerId    : uuidv4(),
				kind          : 'video',
				rtpParameters :
				{
					codecs :
					[
						{
							mimeType     : 'video/VP8',
							payloadType  : 101,
							clockRate    : 90000,
							rtcpFeedback :
							[
								{ type: 'nack' },
								{ type: 'nack', parameter: 'pli' },
								{ type: 'ccm', parameter: 'fir' },
								{ type: 'goog-remb' },
								{ type: 'transport-cc' }
							],
							parameters :
							{
								'x-google-start-bitrate' : 1500
							}
						},
						{
							mimeType     : 'video/rtx',
							payloadType  : 102,
							clockRate    : 90000,
							rtcpFeedback : [],
							parameters   :
							{
								apt : 101
							}
						}
					],
					encodings :
					[
						{
							ssrc : 99991111,
							rtx  :
							{
								ssrc : 99991112
							}
						}
					],
					headerExtensions :
					[
						{
							uri : 'urn:ietf:params:rtp-hdrext:sdes:mid',
							id  : 1
						},
						{
							uri : 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time',
							id  : 4
						},
						{
							uri : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
							id  : 5
						},
						{
							uri : 'urn:3gpp:video-orientation',
							id  : 11
						},
						{
							uri : 'urn:ietf:params:rtp-hdrext:toffset',
							id  : 12
						}
					],
					rtcp :
					{
						cname       : 'wB4Ql4lrsxYLjzuN',
						reducedSize : true,
						mux         : true
					}
				}
			};
		}

		case 'video/H264':
		{
			return {
				id            : id || uuidv4(),
				producerId    : uuidv4(),
				kind          : 'video',
				rtpParameters :
				{
					codecs :
					[
						{
							mimeType     : 'video/H264',
							payloadType  : 103,
							clockRate    : 90000,
							rtcpFeedback :
							[
								{ type: 'nack' },
								{ type: 'nack', parameter: 'pli' },
								{ type: 'ccm', parameter: 'fir' },
								{ type: 'goog-remb' },
								{ type: 'transport-cc' }
							],
							parameters :
							{
								'level-asymmetry-allowed' : 1,
								'packetization-mode'      : 1,
								'profile-level-id'        : '42e01f'
							}
						},
						{
							mimeType     : 'video/rtx',
							payloadType  : 104,
							clockRate    : 90000,
							rtcpFeedback : [],
							parameters   :
							{
								apt : 103
							}
						}
					],
					encodings :
					[
						{
							ssrc : 99991113,
							rtx  :
							{
								ssrc : 99991114
							}
						}
					],
					headerExtensions :
					[
						{
							uri : 'urn:ietf:params:rtp-hdrext:sdes:mid',
							id  : 1
						},
						{
							uri : 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time',
							id  : 4
						},
						{
							uri : 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
							id  : 5
						},
						{
							uri : 'urn:3gpp:video-orientation',
							id  : 11
						},
						{
							uri : 'urn:ietf:params:rtp-hdrext:toffset',
							id  : 12
						}
					],
					rtcp :
					{
						cname       : 'wB4Ql4lrsxYLjzuN',
						reducedSize : true,
						mux         : true
					}
				}
			};
		}

		default:
		{
			throw new TypeError(`unknown codecMimeType "${codecMimeType}"`);
		}
	}
}

export function generateDataProducerRemoteParameters(): { id: string }
{
	return {
		id : uuidv4()
	};
}

export function generateDataConsumerRemoteParameters(
	{ id }:
	{ id?: string } = {}
): mediasoupClient.types.DataConsumerOptions
{
	return {
		id                   : id || uuidv4(),
		dataProducerId       : uuidv4(),
		sctpStreamParameters :
		{
			streamId          : 666,
			maxPacketLifeTime : 5000,
			maxRetransmits    : undefined
		}
	};
}
