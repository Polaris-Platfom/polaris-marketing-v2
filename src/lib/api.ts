import { 
  AuthResponse, 
  CommunitiesResponse, 
  Community, 
  User, 
  LoginFormData, 
  RegisterFormData, 
  CommunityFormData 
} from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

class APIClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    
    // Try to get token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new APIError(
          data.error || data.message || 'An error occurred',
          response.status,
          data.code
        )
      }

      return data
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError('Network error', 0)
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Authentication endpoints
  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    // Set token after successful registration
    if (response.data?.token) {
      this.setToken(response.data.token)
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        wallet: response.data.wallet
      }
    }
    return response
  }

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    // Set token after successful login
    if (response.data?.token) {
      this.setToken(response.data.token)
      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
        wallet: response.data.wallet
      }
    }
    return response
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' })
    } finally {
      // Always clear token, even if API call fails
      this.setToken(null)
    }
  }

  // User endpoints
  async getCurrentUser(): Promise<{ user: User }> {
    return this.request('/users/me')
  }

  async updateProfile(data: Partial<User>): Promise<{ user: User }> {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async getUserCommunities(): Promise<CommunitiesResponse> {
    return this.request('/users/me/communities')
  }

  // Dashboard endpoint - Complete integration
  async getUserDashboard(): Promise<{
    success: boolean
    data: {
      user: User
      wallet: {
        balance: number
        totalEarned: number
        totalSpent: number
        pendingRewards: number
      }
      communities: {
        total: number
        list: Community[]
      }
      proposals: {
        total: number
        byStatus: {
          voting: number
          funded: number
          completed: number
          rejected: number
        }
        recent: any[]
      }
      activity: {
        votesCount: number
        proposalsCreated: number
        communitiesJoined: number
      }
    }
  }> {
    return this.request('/users/me/dashboard')
  }

  // Community endpoints
  async getCommunities(): Promise<CommunitiesResponse> {
    return this.request('/communities')
  }

  async getCommunity(id: string): Promise<{ community: Community }> {
    return this.request(`/communities/${id}`)
  }

  async createCommunity(data: CommunityFormData): Promise<{ 
    success: boolean
    message: string
    data: Community 
  }> {
    return this.request('/communities', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateCommunity(
    id: string, 
    data: Partial<CommunityFormData>
  ): Promise<{ community: Community }> {
    return this.request(`/communities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async joinCommunity(id: string): Promise<{ community: Community }> {
    return this.request(`/communities/${id}/join`, {
      method: 'POST',
    })
  }

  async getCommunityMembers(id: string): Promise<{ members: any[]; count: number }> {
    return this.request(`/communities/${id}/members`)
  }

  async deleteCommunity(id: string): Promise<void> {
    return this.request(`/communities/${id}`, {
      method: 'DELETE',
    })
  }

  // Proposals API - Enhanced integration
  async getProposals(filters?: { 
    communityId?: string
    status?: string
    category?: string
    search?: string 
  }) {
    const params = new URLSearchParams()
    if (filters?.communityId) params.append('communityId', filters.communityId)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.category) params.append('category', filters.category)
    if (filters?.search) params.append('search', filters.search)
    
    const response = await this.request<{
      success: boolean
      data: any[]
      count: number
    }>(`/proposals?${params.toString()}`)
    return response.data
  }

  async getProposalStats(communityId?: string) {
    const params = communityId ? `?communityId=${communityId}` : ''
    const response = await this.request<{
      success: boolean
      data: any
    }>(`/proposals/stats${params}`)
    return response.data
  }

  async getProposal(id: string) {
    const response = await this.request<{
      success: boolean
      data: any
    }>(`/proposals/${id}`)
    return response.data
  }

  async createProposal(data: any) {
    const response = await this.request<{
      success: boolean
      data: any
    }>('/proposals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.data
  }

  async updateProposal(id: string, data: any) {
    const response = await this.request<{
      success: boolean
      data: any
    }>(`/proposals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    return response.data
  }

  async voteOnProposal(proposalId: string, vote: 'for' | 'against', scenario?: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: any
    }>(`/proposals/${proposalId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ vote, scenario }),
    })
    return response
  }

  async getUserVote(proposalId: string) {
    const response = await this.request<any>(`/proposals/${proposalId}/vote`)
    return response.data
  }

  async fundProposal(proposalId: string, amount: number) {
    const response = await this.request<{
      success: boolean
      data: any
    }>(`/proposals/${proposalId}/fund`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
    })
    return response.data
  }

  // Wallet API - Complete integration
  async getWallet() {
    const response = await this.request<{
      success: boolean
      data: {
        balance: number
        totalEarned: number
        totalSpent: number
        pendingRewards: number
      }
    }>('/wallet')
    return response.data
  }

  async getTransactions(limit = 50, type?: string) {
    const params = new URLSearchParams()
    params.append('limit', limit.toString())
    if (type) params.append('type', type)
    
    const response = await this.request<{
      success: boolean
      data: any[]
    }>(`/wallet/transactions?${params.toString()}`)
    return response.data
  }

  async getAchievements() {
    const response = await this.request<{
      success: boolean
      data: {
        totalEarned: number
        achievements: any[]
      }
    }>('/wallet/achievements')
    return response.data
  }

  async spendCoins(amount: number, description: string, proposalId?: string, communityId?: string) {
    const response = await this.request<{
      success: boolean
      data: any
    }>('/wallet/spend', {
      method: 'POST',
      body: JSON.stringify({ amount, description, proposalId, communityId }),
    })
    return response.data
  }

  // Invitations API - New integration
  async getInvitations(filters?: { communityId?: string; status?: string }) {
    const params = new URLSearchParams()
    if (filters?.communityId) params.append('communityId', filters.communityId)
    if (filters?.status) params.append('status', filters.status)
    
    const response = await this.request<{
      success: boolean
      data: any[]
      count: number
    }>(`/invitations?${params.toString()}`)
    return response.data
  }

  async sendInvitation(email: string, communityId: string, message?: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: any
    }>('/invitations', {
      method: 'POST',
      body: JSON.stringify({ email, communityId, message }),
    })
    return response
  }

  async getInvitationByToken(token: string) {
    const response = await this.request<{
      success: boolean
      data: any
    }>(`/invitations/token/${token}`)
    return response.data
  }

  async acceptInvitation(token: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: any
    }>(`/invitations/accept/${token}`, {
      method: 'POST',
    })
    return response
  }

  async declineInvitation(token: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: any
    }>(`/invitations/decline/${token}`, {
      method: 'POST',
    })
    return response
  }

  // Friend invitations endpoints (New User Journey)
  async sendFriendInvitations(emails: string[], message?: string) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        invitations: any[]
        errors?: any[]
      }
    }>('/invitations/friends', {
      method: 'POST',
      body: JSON.stringify({ emails, message }),
    })
    return response
  }

  async getFriendInvitationStatus() {
    const response = await this.request<{
      success: boolean
      data: {
        hasCompletedRequirement: boolean
        requiredCount: number
        stats: {
          total: number
          pending: number
          accepted: number
          declined: number
          expired: number
        }
        recentInvitations: any[]
      }
    }>('/invitations/friends/status')
    return response
  }

  async getInvitationStats() {
    const response = await this.request<{
      success: boolean
      data: {
        total: number
        pending: number
        accepted: number
        declined: number
        expired: number
        pendingRewards: number
      }
    }>('/invitations/stats')
    return response
  }

  // Demo Scenarios API - New integration
  // Scenario 2: Multi-Community Power User
  async setupDemoScenario2() {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        communities: any[]
        proposals: any[]
        userJoined: string[]
        summary: {
          communitiesCreated: number
          communitiesJoined: number
          proposalsCreated: number
          coinsEarned: number
        }
      }
    }>('/demo/scenario2/setup', {
      method: 'POST',
    })
    return response
  }

  async getDemoScenario2Status() {
    const response = await this.request<{
      success: boolean
      data: {
        isSetup: boolean
        communities: any[]
        proposals: {
          total: number
          byStatus: any
          userCreated: number
          userVoted: number
        }
        wallet: {
          balance: number
          totalEarned: number
          totalSpent: number
        }
        activity: {
          totalTransactions: number
          votesCount: number
          proposalsCreated: number
          communitiesJoined: number
        }
      }
    }>('/demo/scenario2/status')
    return response
  }

  // Scenario 3: Voting & Rewards
  async setupDemoScenario3() {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        community: any
        proposal: any
        votingUsers: any[]
        instructions: {
          scenario: string
          steps: string[]
          voteEndpoint: string
          votePayload: string
        }
      }
    }>('/demo/scenario3/setup', {
      method: 'POST',
    })
    return response
  }

  async getDemoScenario3Status() {
    const response = await this.request<{
      success: boolean
      data: {
        isSetup: boolean
        community?: any
        proposal?: any
        currentUser: any
        demoVoters: any[]
        rewardSystem: {
          perVote: number
          authorBonus: number
          normalVoteReward: number
          scenario3VoteReward: number
        }
        nextSteps: string[]
      }
    }>('/demo/scenario3/status')
    return response
  }

  async simulateVotesScenario3(numberOfVotes: number = 1) {
    const response = await this.request<{
      success: boolean
      message: string
      data: {
        simulatedVotes: any[]
        proposalStatus: any
        availableVotersRemaining: number
      }
    }>('/demo/scenario3/simulate-votes', {
      method: 'POST',
      body: JSON.stringify({ numberOfVotes }),
    })
    return response
  }
}

const apiClient = new APIClient(API_BASE_URL)
export { APIError }
export default apiClient 