export type PresaleHub = {
  "version": "0.1.0",
  "name": "presale_hub",
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "presalePrice",
          "type": {
            "array": [
              "u64",
              5
            ]
          }
        },
        {
          "name": "listingPrice",
          "type": "u64"
        },
        {
          "name": "lpPercent",
          "type": "u64"
        },
        {
          "name": "isAutoListing",
          "type": "bool"
        },
        {
          "name": "lockPeriod",
          "type": "u64"
        },
        {
          "name": "minBuy",
          "type": "u64"
        },
        {
          "name": "maxBuy",
          "type": "u64"
        },
        {
          "name": "refundType",
          "type": "u8"
        },
        {
          "name": "isVesting",
          "type": "u8"
        },
        {
          "name": "tgeDate",
          "type": "u64"
        },
        {
          "name": "tgePercent",
          "type": "u64"
        },
        {
          "name": "cycleDays",
          "type": "u64"
        },
        {
          "name": "cycleReleasePercent",
          "type": "u64"
        },
        {
          "name": "padFeePct",
          "type": "u64"
        },
        {
          "name": "validTokenCount",
          "type": "u8"
        },
        {
          "name": "whitelistedTokens",
          "type": {
            "array": [
              "publicKey",
              5
            ]
          }
        }
      ]
    },
    {
      "name": "buyTokenWithSol",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        },
        {
          "name": "tokenAmount",
          "type": "u64"
        },
        {
          "name": "quoteTokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLp",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammCoinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "createFeeDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenCoin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenPc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        },
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "openTime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalizePresale",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenCoin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenPc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "refundBaseToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "emergencyWithdraw",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawQuoteToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        },
        {
          "name": "newPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "presaleState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "tokenVault",
            "type": "publicKey"
          },
          {
            "name": "quoteTokenVaults",
            "type": {
              "array": [
                "publicKey",
                5
              ]
            }
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "presalePrice",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "listingPrice",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "claimTokenAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "quoteTokenAmount",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "lpPercent",
            "type": "u64"
          },
          {
            "name": "isAutoListing",
            "type": "bool"
          },
          {
            "name": "refundType",
            "type": "u8"
          },
          {
            "name": "lockPeriod",
            "type": "u64"
          },
          {
            "name": "minBuy",
            "type": "u64"
          },
          {
            "name": "maxBuy",
            "type": "u64"
          },
          {
            "name": "holders",
            "type": "u64"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "isVesting",
            "type": "u8"
          },
          {
            "name": "tgeDate",
            "type": "u64"
          },
          {
            "name": "tgePercent",
            "type": "u64"
          },
          {
            "name": "cycleDays",
            "type": "u64"
          },
          {
            "name": "cycleReleasePercent",
            "type": "u64"
          },
          {
            "name": "padFeePct",
            "type": "u64"
          },
          {
            "name": "validWhitelistTokenCount",
            "type": "u8"
          },
          {
            "name": "whitelistedTokens",
            "type": {
              "array": [
                "publicKey",
                5
              ]
            }
          },
          {
            "name": "lpCreated",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "lpThreshold",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyTokenAmount",
            "type": "u64"
          },
          {
            "name": "buyQuoteTokenAmount",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "buyTime",
            "type": "u64"
          },
          {
            "name": "claimAmount",
            "type": "u64"
          },
          {
            "name": "claimTime",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyInitialized",
      "msg": "GlobalState was already initialized"
    },
    {
      "code": 6001,
      "name": "AlreadyCreated",
      "msg": "Presale card was already created"
    },
    {
      "code": 6002,
      "name": "NotCreated",
      "msg": "Presale not created yet"
    },
    {
      "code": 6003,
      "name": "NotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6004,
      "name": "AlreadyEnded",
      "msg": "Presale already ended"
    },
    {
      "code": 6005,
      "name": "NotEndedYet",
      "msg": "Presale not ended yet"
    },
    {
      "code": 6006,
      "name": "InsufficientQuoteTokenAmount",
      "msg": "Insufficient quote token amount"
    },
    {
      "code": 6007,
      "name": "WrongQuoteToken",
      "msg": "Quote token is wrong"
    },
    {
      "code": 6008,
      "name": "InvalidBuyAmount",
      "msg": "Buy token amount is out of valid range"
    },
    {
      "code": 6009,
      "name": "InsufficientClaimableAmount",
      "msg": "Insufficient claimable token amount"
    },
    {
      "code": 6010,
      "name": "NotClaimableYet",
      "msg": "Not Claimable yet"
    },
    {
      "code": 6011,
      "name": "AlreadyFinalized",
      "msg": "This presale was already finalized"
    },
    {
      "code": 6012,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6013,
      "name": "InvalidParams1",
      "msg": "Softcap should be less than Hardcap"
    },
    {
      "code": 6014,
      "name": "InvalidParams2",
      "msg": "Start time should be less than End time"
    },
    {
      "code": 6015,
      "name": "InvalidParams3",
      "msg": "Minimum buy amount should be less than Maximum buy amount"
    },
    {
      "code": 6016,
      "name": "InvalidParams",
      "msg": "Wrong parameters"
    },
    {
      "code": 6017,
      "name": "InvalidStartTime",
      "msg": "Start time was already passed"
    },
    {
      "code": 6018,
      "name": "InvalidEndTime",
      "msg": "Invalid end time"
    },
    {
      "code": 6019,
      "name": "InvalidInvestor",
      "msg": "Invalid investor"
    },
    {
      "code": 6020,
      "name": "NotReachedAtSoftCap",
      "msg": "Not reached at softcap"
    },
    {
      "code": 6021,
      "name": "ReachedAtSoftCap",
      "msg": "Reached at softcap"
    },
    {
      "code": 6022,
      "name": "OverflowHardCap",
      "msg": "Overflow hardcap"
    },
    {
      "code": 6023,
      "name": "InvalidQuoteToken",
      "msg": "Not whitelisted quote token"
    },
    {
      "code": 6024,
      "name": "LPAlreadyCreated",
      "msg": "LP was already created"
    }
  ]
};

export const IDL: PresaleHub = {
  "version": "0.1.0",
  "name": "presale_hub",
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenMintAddress",
          "type": "publicKey"
        },
        {
          "name": "softcapAmount",
          "type": "u64"
        },
        {
          "name": "hardcapAmount",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "endTime",
          "type": "u64"
        },
        {
          "name": "presalePrice",
          "type": {
            "array": [
              "u64",
              5
            ]
          }
        },
        {
          "name": "listingPrice",
          "type": "u64"
        },
        {
          "name": "lpPercent",
          "type": "u64"
        },
        {
          "name": "isAutoListing",
          "type": "bool"
        },
        {
          "name": "lockPeriod",
          "type": "u64"
        },
        {
          "name": "minBuy",
          "type": "u64"
        },
        {
          "name": "maxBuy",
          "type": "u64"
        },
        {
          "name": "refundType",
          "type": "u8"
        },
        {
          "name": "isVesting",
          "type": "u8"
        },
        {
          "name": "tgeDate",
          "type": "u64"
        },
        {
          "name": "tgePercent",
          "type": "u64"
        },
        {
          "name": "cycleDays",
          "type": "u64"
        },
        {
          "name": "cycleReleasePercent",
          "type": "u64"
        },
        {
          "name": "padFeePct",
          "type": "u64"
        },
        {
          "name": "validTokenCount",
          "type": "u8"
        },
        {
          "name": "whitelistedTokens",
          "type": {
            "array": [
              "publicKey",
              5
            ]
          }
        }
      ]
    },
    {
      "name": "buyTokenWithSol",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        },
        {
          "name": "tokenAmount",
          "type": "u64"
        },
        {
          "name": "quoteTokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLp",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "raydiumAmmProgram",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammOpenOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammCoinMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammCoinVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammPcVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammTargetOrders",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "createFeeDestination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenCoin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenPc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        },
        {
          "name": "nonce",
          "type": "u8"
        },
        {
          "name": "openTime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalizePresale",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasury",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenCoin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenPc",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "refundBaseToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ownerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "emergencyWithdraw",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawQuoteToken",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presaleWhitelistedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "updatePrice",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "presaleState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quoteTokenId",
          "type": "u8"
        },
        {
          "name": "newPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "globalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "presaleState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "tokenMintAddress",
            "type": "publicKey"
          },
          {
            "name": "tokenVault",
            "type": "publicKey"
          },
          {
            "name": "quoteTokenVaults",
            "type": {
              "array": [
                "publicKey",
                5
              ]
            }
          },
          {
            "name": "softcapAmount",
            "type": "u64"
          },
          {
            "name": "hardcapAmount",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "u64"
          },
          {
            "name": "presalePrice",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "listingPrice",
            "type": "u64"
          },
          {
            "name": "soldTokenAmount",
            "type": "u64"
          },
          {
            "name": "claimTokenAmount",
            "type": "u64"
          },
          {
            "name": "depositTokenAmount",
            "type": "u64"
          },
          {
            "name": "quoteTokenAmount",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "lpPercent",
            "type": "u64"
          },
          {
            "name": "isAutoListing",
            "type": "bool"
          },
          {
            "name": "refundType",
            "type": "u8"
          },
          {
            "name": "lockPeriod",
            "type": "u64"
          },
          {
            "name": "minBuy",
            "type": "u64"
          },
          {
            "name": "maxBuy",
            "type": "u64"
          },
          {
            "name": "holders",
            "type": "u64"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "isVesting",
            "type": "u8"
          },
          {
            "name": "tgeDate",
            "type": "u64"
          },
          {
            "name": "tgePercent",
            "type": "u64"
          },
          {
            "name": "cycleDays",
            "type": "u64"
          },
          {
            "name": "cycleReleasePercent",
            "type": "u64"
          },
          {
            "name": "padFeePct",
            "type": "u64"
          },
          {
            "name": "validWhitelistTokenCount",
            "type": "u8"
          },
          {
            "name": "whitelistedTokens",
            "type": {
              "array": [
                "publicKey",
                5
              ]
            }
          },
          {
            "name": "lpCreated",
            "type": {
              "array": [
                "u8",
                5
              ]
            }
          },
          {
            "name": "lpThreshold",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyTokenAmount",
            "type": "u64"
          },
          {
            "name": "buyQuoteTokenAmount",
            "type": {
              "array": [
                "u64",
                5
              ]
            }
          },
          {
            "name": "buyTime",
            "type": "u64"
          },
          {
            "name": "claimAmount",
            "type": "u64"
          },
          {
            "name": "claimTime",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyInitialized",
      "msg": "GlobalState was already initialized"
    },
    {
      "code": 6001,
      "name": "AlreadyCreated",
      "msg": "Presale card was already created"
    },
    {
      "code": 6002,
      "name": "NotCreated",
      "msg": "Presale not created yet"
    },
    {
      "code": 6003,
      "name": "NotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6004,
      "name": "AlreadyEnded",
      "msg": "Presale already ended"
    },
    {
      "code": 6005,
      "name": "NotEndedYet",
      "msg": "Presale not ended yet"
    },
    {
      "code": 6006,
      "name": "InsufficientQuoteTokenAmount",
      "msg": "Insufficient quote token amount"
    },
    {
      "code": 6007,
      "name": "WrongQuoteToken",
      "msg": "Quote token is wrong"
    },
    {
      "code": 6008,
      "name": "InvalidBuyAmount",
      "msg": "Buy token amount is out of valid range"
    },
    {
      "code": 6009,
      "name": "InsufficientClaimableAmount",
      "msg": "Insufficient claimable token amount"
    },
    {
      "code": 6010,
      "name": "NotClaimableYet",
      "msg": "Not Claimable yet"
    },
    {
      "code": 6011,
      "name": "AlreadyFinalized",
      "msg": "This presale was already finalized"
    },
    {
      "code": 6012,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6013,
      "name": "InvalidParams1",
      "msg": "Softcap should be less than Hardcap"
    },
    {
      "code": 6014,
      "name": "InvalidParams2",
      "msg": "Start time should be less than End time"
    },
    {
      "code": 6015,
      "name": "InvalidParams3",
      "msg": "Minimum buy amount should be less than Maximum buy amount"
    },
    {
      "code": 6016,
      "name": "InvalidParams",
      "msg": "Wrong parameters"
    },
    {
      "code": 6017,
      "name": "InvalidStartTime",
      "msg": "Start time was already passed"
    },
    {
      "code": 6018,
      "name": "InvalidEndTime",
      "msg": "Invalid end time"
    },
    {
      "code": 6019,
      "name": "InvalidInvestor",
      "msg": "Invalid investor"
    },
    {
      "code": 6020,
      "name": "NotReachedAtSoftCap",
      "msg": "Not reached at softcap"
    },
    {
      "code": 6021,
      "name": "ReachedAtSoftCap",
      "msg": "Reached at softcap"
    },
    {
      "code": 6022,
      "name": "OverflowHardCap",
      "msg": "Overflow hardcap"
    },
    {
      "code": 6023,
      "name": "InvalidQuoteToken",
      "msg": "Not whitelisted quote token"
    },
    {
      "code": 6024,
      "name": "LPAlreadyCreated",
      "msg": "LP was already created"
    }
  ]
};
