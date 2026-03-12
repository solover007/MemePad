pub const GLOBAL_STATE_SEED: &[u8] = b"GLOBAL_STATE_SEED";
pub const STAKE_STATE_SEED: &[u8] = b"STAKE_STATE_SEED";
pub const USER_STATE_SEED: &[u8] = b"USER_STATE_SEED";

pub const VAULT_SEED: &[u8] = b"VAULT_SEED";

// Whitelist token info
pub const MAX_WHITELISTED_TOKENS: usize = 5;
pub const STAKE_COUNT: usize = 5; // 100%
pub const SECS_IN_DAY: u64 = 86_400;

//Staking card info
pub const STAKE_PERIODS: [u64; STAKE_COUNT] = [30*SECS_IN_DAY, 90*SECS_IN_DAY, 180*SECS_IN_DAY, 365*SECS_IN_DAY, 1460*SECS_IN_DAY]; // [30 days, 90 days, 180 days, 1 year, 4 year]
pub const APYS: [[u64; STAKE_COUNT]; MAX_WHITELISTED_TOKENS] = [
    [25_000, 50_000, 75_000, 100_000, 125_000], // [25%, 50%, 75%, 100%, 125%]
    [25_000, 50_000, 75_000, 100_000, 125_000],
    [25_000, 50_000, 75_000, 100_000, 125_000],
    [25_000, 50_000, 75_000, 100_000, 125_000],
    [25_000, 50_000, 75_000, 100_000, 125_000]
];
pub const MIN_STAKE_AMOUNTS: [[u64; STAKE_COUNT]; MAX_WHITELISTED_TOKENS] = [
    [1_000, 10_000, 100_000, 500_000, 1_000_000], // MPAD
    [1_000, 10_000, 100_000, 500_000, 1_000_000], // WSOL
    [1_000, 10_000, 100_000, 500_000, 1_000_000],
    [1_000, 10_000, 100_000, 500_000, 1_000_000],
    [1_000, 10_000, 100_000, 500_000, 1_000_000],
];

pub const DENOMINATOR: u64 = 100_000; // 100%
pub const WITHDRAW_FEE: u64 = 10_000; // 10%

// Constant
pub const YEAR_1: u64 = 365 * SECS_IN_DAY;
