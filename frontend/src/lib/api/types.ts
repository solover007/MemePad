export interface TokenListing {
  token_address: string;
  openbook_id?: string;
  token_name: string;
  token_symbol: string;
  listing_name: string;
  listing_description: string;
  cover_image?: string;
  treasury_wallet: string;
  total_supply: number;
  min_buy?: number;
  max_buy?: number;
  presale_rate?: number;
  listing_rate?: number;
  liquidity_percent?: number;
  soft_cap?: number;
  hard_cap?: number;
  start_date: string; // using string to represent TIMESTAMPTZ
  end_date: string; // using string to represent TIMESTAMPTZ
  active?: boolean;
  min_ticket_size?: number;
  max_ticket_size?: number;
  pool_launch_delay?: string; // using string to represent INTERVAL
  is_vesting?: number; // 0, 1
  tge_date?: number;
  tge_percent?: number;
  cycle_days?: number;
  cycle_release_percent?: number;
  tokenomics_list: object; // JSONB represented as an object
  token_price?: number;
  launch_mc?: number;
  telegram_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  website_link?: string;
  youtube_video_link?: string;
  listing_date?: string; // using string to represent TIMESTAMPTZ
  created_at?: string; // using string to represent TIMESTAMPTZ
  updated_at?: string; // using string to represent TIMESTAMPTZ
}

export interface IMetaData {
  name: string;
  symbol: string;
  decimal: number;
  totalSupply: number;
  description?: string;
  image?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}
