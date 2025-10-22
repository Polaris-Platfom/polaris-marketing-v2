// User types matching backend API
export interface User {
  id: string
  name: string
  email: string
  communities: CommunityMembership[]
  createdAt: string
  updatedAt: string
}

export interface AuthUser extends User {
  token: string
  tokenType: 'Bearer'
}

// Community types matching backend API
export interface Community {
  id: string
  name: string
  description: string
  slug: string
  isPublic: boolean
  location?: string | null
  category?: string | null
  goals?: string | null
  settings: CommunitySettings
  members: CommunityMembership[]
  stats: CommunityStats
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface CommunitySettings {
  allowProposals: boolean
  requireApproval: boolean
  votingEnabled: boolean
  fundingEnabled: boolean
}

export interface CommunityMembership {
  userId: string
  communityId?: string
  role: 'admin' | 'member' | 'viewer'
  joinedAt: string
}

export interface CommunityStats {
  memberCount: number
  proposalCount: number
  totalFunding: number
}

// Wallet types
export interface Wallet {
  balance: number
  totalEarned: number
  totalSpent?: number
  pendingRewards?: number
}

// API Response types
export interface APIResponse<T = any> {
  success?: boolean
  message?: string
  data?: T
  error?: string
  code?: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  token: string
  user: User
  wallet?: Wallet
}

export interface CommunitiesResponse {
  communities: Community[]
  count: number
  type?: 'user_communities' | 'public_communities'
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
}

export interface CommunityFormData {
  name: string
  description: string
  isPublic: boolean
  location?: string
  category?: string
  initialFunding?: number
  goals?: string
}

// Proposal types
export interface Proposal {
  id: string
  title: string
  description: string
  communityId: string
  communityName?: string
  authorId: string
  authorName: string
  fundingGoal: number
  currentFunding?: number
  category: string
  status: 'voting' | 'funded' | 'completed' | 'rejected'
  timeline: string
  budget: string
  benefits: string
  targetAudience: string
  risks: string
  team: string
  location?: string
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  quorumReached: boolean
  userHasVoted?: boolean
  userVote?: 'for' | 'against'
  createdAt: string
  updatedAt: string
}

// Transaction types
export interface Transaction {
  id: string
  userId: string
  type: 'earned' | 'spent' | 'received'
  amount: number
  description: string
  category?: string
  proposalId?: string
  communityId?: string
  timestamp: string
  txHash?: string
}

// Invitation types
export interface Invitation {
  id: string
  email: string
  communityId: string
  communityName: string
  invitedBy: string
  inviterName: string
  message?: string
  token: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
  expiresAt: string
  createdAt: string
}

// Demo Scenario types
export interface DemoScenario2Data {
  communities: Community[]
  proposals: Proposal[]
  userJoined: string[]
  summary: {
    communitiesCreated: number
    communitiesJoined: number
    proposalsCreated: number
    coinsEarned: number
  }
}

export interface DemoScenario3Data {
  community: Community
  proposal: Proposal
  votingUsers: any[]
  instructions: {
    scenario: string
    steps: string[]
    voteEndpoint: string
    votePayload: string
  }
}

// Navigation and UI types
export interface NavigationItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  current?: boolean
  requiresAuth?: boolean
}

export interface CommunityContextType {
  currentCommunity: Community | null
  userCommunities: Community[]
  isLoading: boolean
  switchCommunity: (communityId: string) => void
  createCommunity: (data: CommunityFormData) => Promise<Community>
  joinCommunity: (communityId: string) => Promise<void>
  leaveCommunity: (communityId: string) => Promise<void>
  refreshCommunities: () => Promise<void>
}

// Blog types
export interface BlogAuthor {
  name: string
  role: string
  bio: string
  image: string
  initials: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: BlogAuthor
  date: string
  category: string
  readTime: number
  image: string
  tags: string[]
  featured: boolean
}

export interface BlogFormData {
  title: string
  excerpt: string
  content: string
  author: BlogAuthor
  category: string
  readTime: number
  image: string
  tags: string[]
  featured: boolean
  locale?: string
} 