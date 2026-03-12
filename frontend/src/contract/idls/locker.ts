export type LpLocker = {
  "version": "0.1.0",
  "name": "lp_locker",
  "instructions": [
    {
      "name": "initialize",
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
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateFee",
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
        }
      ],
      "args": [
        {
          "name": "marketplaceFee",
          "type": "u64"
        },
        {
          "name": "penaltyFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "startLock",
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
        }
      ],
      "args": []
    },
    {
      "name": "lockLp",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpState",
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
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
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
        }
      ]
    },
    {
      "name": "unlockLp",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpState",
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
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vestingId",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createSaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vestingId",
          "type": "u8"
        },
        {
          "name": "saleMode",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "minPrice",
          "type": "u64"
        },
        {
          "name": "immediatePrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buySaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "vestingId",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "bidPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "approveSaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "saleVestingId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cancelSaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "saleVestingId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cancelAuctionBid",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "saleVestingId",
          "type": "u8"
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
            "name": "isStarted",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenVault",
            "type": "publicKey"
          },
          {
            "name": "penaltyFee",
            "type": "u64"
          },
          {
            "name": "marketplaceFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userLpState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "mintKey",
            "type": "publicKey"
          },
          {
            "name": "vestingCount",
            "type": "u8"
          },
          {
            "name": "vests",
            "type": {
              "array": [
                {
                  "defined": "VestingState"
                },
                5
              ]
            }
          },
          {
            "name": "saleVestingCount",
            "type": "u8"
          },
          {
            "name": "saleVests",
            "type": {
              "array": [
                {
                  "defined": "SaleVestingState"
                },
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vestingPlan",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalAmount",
            "type": "u64"
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
          }
        ]
      }
    },
    {
      "name": "vestingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plan",
            "type": {
              "defined": "VestingPlan"
            }
          },
          {
            "name": "currentAmount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "saleVestingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "originalId",
            "type": "u8"
          },
          {
            "name": "saleMode",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "minPrice",
            "type": "u64"
          },
          {
            "name": "immediatePrice",
            "type": "u64"
          },
          {
            "name": "maxBidPrice",
            "type": "u64"
          },
          {
            "name": "maxPriceBidder",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotAllowedAuthority",
      "msg": "Not allowed authority"
    },
    {
      "code": 6001,
      "name": "NotStarted",
      "msg": "Not yet started"
    },
    {
      "code": 6002,
      "name": "InsufficientBalance",
      "msg": "Not locked such amount token"
    },
    {
      "code": 6003,
      "name": "InvalidLockTime",
      "msg": "Lock period is invalid"
    },
    {
      "code": 6004,
      "name": "NotLocked",
      "msg": "Not locked"
    },
    {
      "code": 6005,
      "name": "NotAllowedYet",
      "msg": "Lock period is not finished, yet"
    },
    {
      "code": 6006,
      "name": "NotSwitchable",
      "msg": "Could not switch lock mode"
    },
    {
      "code": 6007,
      "name": "InsufficientAmount",
      "msg": "Should be over minimum amount"
    },
    {
      "code": 6008,
      "name": "IncorrectUserState",
      "msg": "Incorrect User State"
    },
    {
      "code": 6009,
      "name": "IncorrectReferral",
      "msg": "Incorrect Referral Pubkey"
    },
    {
      "code": 6010,
      "name": "InvalidVestingCount",
      "msg": "Already exceed invalid vesting count"
    },
    {
      "code": 6011,
      "name": "InvalidId",
      "msg": "Invalid id"
    }
  ]
};

export const IDL: LpLocker = {
  "version": "0.1.0",
  "name": "lp_locker",
  "instructions": [
    {
      "name": "initialize",
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
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateFee",
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
        }
      ],
      "args": [
        {
          "name": "marketplaceFee",
          "type": "u64"
        },
        {
          "name": "penaltyFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "startLock",
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
        }
      ],
      "args": []
    },
    {
      "name": "lockLp",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpState",
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
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
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
        }
      ]
    },
    {
      "name": "unlockLp",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpState",
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
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vestingId",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createSaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vestingId",
          "type": "u8"
        },
        {
          "name": "saleMode",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "minPrice",
          "type": "u64"
        },
        {
          "name": "immediatePrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buySaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "vestingId",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "bidPrice",
          "type": "u64"
        }
      ]
    },
    {
      "name": "approveSaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "saleVestingId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cancelSaleVesting",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "saleVestingId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "cancelAuctionBid",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sellerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerLpState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
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
          "name": "saleVestingId",
          "type": "u8"
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
            "name": "isStarted",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "vault",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "tokenVault",
            "type": "publicKey"
          },
          {
            "name": "penaltyFee",
            "type": "u64"
          },
          {
            "name": "marketplaceFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userLpState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "mintKey",
            "type": "publicKey"
          },
          {
            "name": "vestingCount",
            "type": "u8"
          },
          {
            "name": "vests",
            "type": {
              "array": [
                {
                  "defined": "VestingState"
                },
                5
              ]
            }
          },
          {
            "name": "saleVestingCount",
            "type": "u8"
          },
          {
            "name": "saleVests",
            "type": {
              "array": [
                {
                  "defined": "SaleVestingState"
                },
                5
              ]
            }
          }
        ]
      }
    },
    {
      "name": "vestingPlan",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalAmount",
            "type": "u64"
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
          }
        ]
      }
    },
    {
      "name": "vestingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "plan",
            "type": {
              "defined": "VestingPlan"
            }
          },
          {
            "name": "currentAmount",
            "type": "u64"
          },
          {
            "name": "createdAt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "saleVestingState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "originalId",
            "type": "u8"
          },
          {
            "name": "saleMode",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "minPrice",
            "type": "u64"
          },
          {
            "name": "immediatePrice",
            "type": "u64"
          },
          {
            "name": "maxBidPrice",
            "type": "u64"
          },
          {
            "name": "maxPriceBidder",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotAllowedAuthority",
      "msg": "Not allowed authority"
    },
    {
      "code": 6001,
      "name": "NotStarted",
      "msg": "Not yet started"
    },
    {
      "code": 6002,
      "name": "InsufficientBalance",
      "msg": "Not locked such amount token"
    },
    {
      "code": 6003,
      "name": "InvalidLockTime",
      "msg": "Lock period is invalid"
    },
    {
      "code": 6004,
      "name": "NotLocked",
      "msg": "Not locked"
    },
    {
      "code": 6005,
      "name": "NotAllowedYet",
      "msg": "Lock period is not finished, yet"
    },
    {
      "code": 6006,
      "name": "NotSwitchable",
      "msg": "Could not switch lock mode"
    },
    {
      "code": 6007,
      "name": "InsufficientAmount",
      "msg": "Should be over minimum amount"
    },
    {
      "code": 6008,
      "name": "IncorrectUserState",
      "msg": "Incorrect User State"
    },
    {
      "code": 6009,
      "name": "IncorrectReferral",
      "msg": "Incorrect Referral Pubkey"
    },
    {
      "code": 6010,
      "name": "InvalidVestingCount",
      "msg": "Already exceed invalid vesting count"
    },
    {
      "code": 6011,
      "name": "InvalidId",
      "msg": "Invalid id"
    }
  ]
};
