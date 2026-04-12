// Mock data for all screens

export const mockWords = [
  { id: 1, word: 'blorple', definition: 'The feeling of unexpected delight when finding something forgotten', partOfSpeech: 'noun', status: 'active', postsCount: 142, assignedCount: 8, createdAt: '2026-01-15', subreddits: ['r/Showerthoughts', 'r/CasualConversation'] },
  { id: 2, word: 'frumious', definition: 'Being simultaneously fuming and furious', partOfSpeech: 'adjective', status: 'active', postsCount: 89, assignedCount: 5, createdAt: '2026-01-20', subreddits: ['r/rant', 'r/offmychest'] },
  { id: 3, word: 'snorkel', definition: 'To spiral into a nap unexpectedly', partOfSpeech: 'verb', status: 'paused', postsCount: 31, assignedCount: 3, createdAt: '2026-02-01', subreddits: ['r/Showerthoughts'] },
  { id: 4, word: 'plimble', definition: 'The awkward moment of waving back at someone not waving at you', partOfSpeech: 'noun', status: 'active', postsCount: 204, assignedCount: 12, createdAt: '2026-02-10', subreddits: ['r/CasualConversation', 'r/tifu'] },
  { id: 5, word: 'zorbify', definition: 'To transform something mundane into something extraordinary', partOfSpeech: 'verb', status: 'completed', postsCount: 500, assignedCount: 0, createdAt: '2025-12-01', subreddits: ['r/LifeProTips'] },
  { id: 6, word: 'quiffle', definition: 'The soft sound of papers being rearranged without purpose', partOfSpeech: 'noun', status: 'active', postsCount: 67, assignedCount: 6, createdAt: '2026-02-20', subreddits: ['r/mildlyinteresting'] },
  { id: 7, word: 'thrumble', definition: 'To hum a tune that does not actually exist', partOfSpeech: 'verb', status: 'draft', postsCount: 0, assignedCount: 0, createdAt: '2026-03-01', subreddits: ['r/Music'] },
  { id: 8, word: 'glorbish', definition: 'Of questionable but endearing quality', partOfSpeech: 'adjective', status: 'active', postsCount: 118, assignedCount: 9, createdAt: '2026-02-28', subreddits: ['r/CasualConversation', 'r/funny'] },
];

export const mockContributors = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul.s@gmail.com', country: 'India', region: 'South Asia', accountAge: '4 years', karma: 12400, qualityScore: 94, approvalRate: 97, totalTasks: 48, completedTasks: 46, totalEarnings: 230, status: 'active', riskFlag: false, joinedAt: '2026-01-10', paymentMethod: 'PayPal' },
  { id: 2, name: 'Maria Santos', email: 'maria.santos@outlook.com', country: 'Philippines', region: 'Southeast Asia', accountAge: '6 years', karma: 8900, qualityScore: 88, approvalRate: 91, totalTasks: 62, completedTasks: 57, totalEarnings: 285, status: 'active', riskFlag: false, joinedAt: '2026-01-12', paymentMethod: 'Stripe' },
  { id: 3, name: 'James O\'Brien', email: 'james.ob@gmail.com', country: 'USA', region: 'North America', accountAge: '3 years', karma: 5600, qualityScore: 72, approvalRate: 78, totalTasks: 23, completedTasks: 18, totalEarnings: 90, status: 'active', riskFlag: true, joinedAt: '2026-01-20', paymentMethod: 'PayPal' },
  { id: 4, name: 'Priya Patel', email: 'priya.patel@yahoo.com', country: 'India', region: 'South Asia', accountAge: '5 years', karma: 21000, qualityScore: 98, approvalRate: 99, totalTasks: 88, completedTasks: 87, totalEarnings: 435, status: 'active', riskFlag: false, joinedAt: '2025-12-15', paymentMethod: 'PayPal' },
  { id: 5, name: 'Carlos Mendez', email: 'carlos.m@proton.me', country: 'Mexico', region: 'Latin America', accountAge: '2 years', karma: 3200, qualityScore: 65, approvalRate: 70, totalTasks: 14, completedTasks: 10, totalEarnings: 50, status: 'suspended', riskFlag: true, joinedAt: '2026-02-01', paymentMethod: 'Stripe' },
  { id: 6, name: 'Aiko Tanaka', email: 'aiko.t@gmail.com', country: 'Japan', region: 'East Asia', accountAge: '7 years', karma: 45000, qualityScore: 99, approvalRate: 100, totalTasks: 120, completedTasks: 120, totalEarnings: 600, status: 'active', riskFlag: false, joinedAt: '2025-11-01', paymentMethod: 'Stripe' },
  { id: 7, name: 'Fatima Al-Hassan', email: 'fatima.h@gmail.com', country: 'Nigeria', region: 'Africa', accountAge: '3 years', karma: 7800, qualityScore: 82, approvalRate: 85, totalTasks: 31, completedTasks: 27, totalEarnings: 135, status: 'active', riskFlag: false, joinedAt: '2026-01-25', paymentMethod: 'PayPal' },
  { id: 8, name: 'Tom Fletcher', email: 'tom.f@gmail.com', country: 'UK', region: 'Europe', accountAge: '8 years', karma: 32000, qualityScore: 91, approvalRate: 95, totalTasks: 55, completedTasks: 53, totalEarnings: 265, status: 'inactive', riskFlag: false, joinedAt: '2026-01-05', paymentMethod: 'Stripe' },
];

export const mockAssignments = [
  { id: 1, wordId: 1, word: 'blorple', contributorId: 1, contributor: 'Rahul Sharma', status: 'posted', dueDate: '2026-04-05', assignedAt: '2026-03-28', completedAt: '2026-03-30', platform: 'Reddit', subreddit: 'r/Showerthoughts', amount: 5 },
  { id: 2, wordId: 2, word: 'frumious', contributorId: 2, contributor: 'Maria Santos', status: 'verified', dueDate: '2026-04-03', assignedAt: '2026-03-27', completedAt: '2026-03-29', platform: 'Reddit', subreddit: 'r/rant', amount: 5 },
  { id: 3, wordId: 1, word: 'blorple', contributorId: 4, contributor: 'Priya Patel', status: 'paid', dueDate: '2026-04-02', assignedAt: '2026-03-26', completedAt: '2026-03-28', platform: 'Reddit', subreddit: 'r/CasualConversation', amount: 5 },
  { id: 4, wordId: 4, word: 'plimble', contributorId: 6, contributor: 'Aiko Tanaka', status: 'assigned', dueDate: '2026-04-07', assignedAt: '2026-03-31', completedAt: null, platform: 'Reddit', subreddit: 'r/tifu', amount: 5 },
  { id: 5, wordId: 3, word: 'snorkel', contributorId: 3, contributor: 'James O\'Brien', status: 'rejected', dueDate: '2026-03-30', assignedAt: '2026-03-24', completedAt: '2026-03-29', platform: 'Reddit', subreddit: 'r/Showerthoughts', amount: 0 },
  { id: 6, wordId: 6, word: 'quiffle', contributorId: 7, contributor: 'Fatima Al-Hassan', status: 'posted', dueDate: '2026-04-06', assignedAt: '2026-03-29', completedAt: '2026-03-31', platform: 'Reddit', subreddit: 'r/mildlyinteresting', amount: 5 },
  { id: 7, wordId: 8, word: 'glorbish', contributorId: 8, contributor: 'Tom Fletcher', status: 'assigned', dueDate: '2026-04-08', assignedAt: '2026-03-31', completedAt: null, platform: 'Reddit', subreddit: 'r/CasualConversation', amount: 5 },
  { id: 8, wordId: 2, word: 'frumious', contributorId: 1, contributor: 'Rahul Sharma', status: 'verified', dueDate: '2026-04-04', assignedAt: '2026-03-28', completedAt: '2026-03-30', platform: 'Reddit', subreddit: 'r/offmychest', amount: 5 },
  { id: 9, wordId: 4, word: 'plimble', contributorId: 1, contributor: 'Rahul Sharma', status: 'assigned', dueDate: '2026-04-12', assignedAt: '2026-04-05', completedAt: null, platform: 'Reddit', subreddit: 'r/tifu', amount: 7 },
  { id: 10, wordId: 6, word: 'quiffle', contributorId: 1, contributor: 'Rahul Sharma', status: 'assigned', dueDate: '2026-04-14', assignedAt: '2026-04-06', completedAt: null, platform: 'Reddit', subreddit: 'r/AskReddit', amount: 5 },
  { id: 11, wordId: 3, word: 'snorkel', contributorId: 1, contributor: 'Rahul Sharma', status: 'paid', dueDate: '2026-03-20', assignedAt: '2026-03-14', completedAt: '2026-03-18', platform: 'Reddit', subreddit: 'r/CasualConversation', amount: 5 },
  { id: 12, wordId: 8, word: 'glorbish', contributorId: 1, contributor: 'Rahul Sharma', status: 'paid', dueDate: '2026-03-25', assignedAt: '2026-03-18', completedAt: '2026-03-22', platform: 'Reddit', subreddit: 'r/mildlyinteresting', amount: 5 },
  { id: 13, wordId: 5, word: 'vexion', contributorId: 1, contributor: 'Rahul Sharma', status: 'rejected', dueDate: '2026-03-28', assignedAt: '2026-03-20', completedAt: '2026-03-26', platform: 'Reddit', subreddit: 'r/unpopularopinion', amount: 0 },
];

export const mockSubmissions = [
  { id: 1, assignmentId: 1, contributor: 'Rahul Sharma', word: 'blorple', url: 'https://reddit.com/r/Showerthoughts/comments/abc123', submittedAt: '2026-03-30 14:22', status: 'pending', wordFound: true, confidence: 98, subreddit: 'r/Showerthoughts', upvotes: 234, comments: 18 },
  { id: 2, assignmentId: 2, contributor: 'Maria Santos', word: 'frumious', url: 'https://reddit.com/r/rant/comments/def456', submittedAt: '2026-03-29 09:15', status: 'approved', wordFound: true, confidence: 100, subreddit: 'r/rant', upvotes: 89, comments: 7 },
  { id: 3, assignmentId: 5, contributor: 'James O\'Brien', word: 'snorkel', url: 'https://reddit.com/r/Showerthoughts/comments/ghi789', submittedAt: '2026-03-29 18:40', status: 'rejected', wordFound: false, confidence: 12, subreddit: 'r/Showerthoughts', upvotes: 3, comments: 0 },
  { id: 4, assignmentId: 6, contributor: 'Fatima Al-Hassan', word: 'quiffle', url: 'https://reddit.com/r/mildlyinteresting/comments/jkl012', submittedAt: '2026-03-31 11:05', status: 'pending', wordFound: true, confidence: 95, subreddit: 'r/mildlyinteresting', upvotes: 45, comments: 3 },
  { id: 5, assignmentId: 3, contributor: 'Priya Patel', word: 'blorple', url: 'https://reddit.com/r/CasualConversation/comments/mno345', submittedAt: '2026-03-28 16:30', status: 'approved', wordFound: true, confidence: 100, subreddit: 'r/CasualConversation', upvotes: 512, comments: 42 },
  { id: 6, assignmentId: 8, contributor: 'Rahul Sharma', word: 'frumious', url: 'https://reddit.com/r/offmychest/comments/pqr678', submittedAt: '2026-03-30 20:10', status: 'pending', wordFound: true, confidence: 97, subreddit: 'r/offmychest', upvotes: 67, comments: 5 },
];

export const mockPayments = [
  { id: 1, contributorId: 1, contributor: 'Rahul Sharma', amount: 10, status: 'completed', method: 'PayPal', createdAt: '2026-03-28', paidAt: '2026-03-29', assignments: 2 },
  { id: 2, contributorId: 2, contributor: 'Maria Santos', amount: 5, status: 'pending', method: 'Stripe', createdAt: '2026-03-29', paidAt: null, assignments: 1 },
  { id: 3, contributorId: 4, contributor: 'Priya Patel', amount: 25, status: 'completed', method: 'PayPal', createdAt: '2026-03-25', paidAt: '2026-03-26', assignments: 5 },
  { id: 4, contributorId: 6, contributor: 'Aiko Tanaka', amount: 40, status: 'completed', method: 'Stripe', createdAt: '2026-03-20', paidAt: '2026-03-21', assignments: 8 },
  { id: 5, contributorId: 3, contributor: 'James O\'Brien', amount: 5, status: 'failed', method: 'PayPal', createdAt: '2026-03-29', paidAt: null, assignments: 1 },
  { id: 6, contributorId: 7, contributor: 'Fatima Al-Hassan', amount: 15, status: 'pending', method: 'PayPal', createdAt: '2026-03-31', paidAt: null, assignments: 3 },
];

export const mockDashboardStats = {
  totalWords: 8,
  activeWords: 5,
  totalContributors: 156,
  activeContributors: 84,
  pendingVerifications: 23,
  totalPosts: 1651,
  successRate: 89.4,
  avgCostPerPost: 4.87,
  pendingPayments: 12,
  totalSpent: 2840,
  postsToday: 47,
  postsThisWeek: 312,
};

export const mockChartData = {
  postsPerDay: [
    { date: 'Mar 25', posts: 38, verified: 31, rejected: 7 },
    { date: 'Mar 26', posts: 42, verified: 38, rejected: 4 },
    { date: 'Mar 27', posts: 55, verified: 48, rejected: 7 },
    { date: 'Mar 28', posts: 61, verified: 54, rejected: 7 },
    { date: 'Mar 29', posts: 48, verified: 43, rejected: 5 },
    { date: 'Mar 30', posts: 52, verified: 46, rejected: 6 },
    { date: 'Mar 31', posts: 47, verified: 41, rejected: 6 },
  ],
  wordDistribution: [
    { word: 'blorple', posts: 142 },
    { word: 'frumious', posts: 89 },
    { word: 'plimble', posts: 204 },
    { word: 'quiffle', posts: 67 },
    { word: 'glorbish', posts: 118 },
    { word: 'others', posts: 31 },
  ],
  regionDistribution: [
    { region: 'South Asia', count: 68 },
    { region: 'Southeast Asia', count: 34 },
    { region: 'North America', count: 22 },
    { region: 'Europe', count: 18 },
    { region: 'East Asia', count: 8 },
    { region: 'Africa', count: 6 },
  ],
};

export const mockFraudFlags = [
  { id: 1, contributorId: 3, contributor: 'James O\'Brien', reason: 'Multiple account suspicion', severity: 'high', detectedAt: '2026-03-29', ipAddress: '192.168.1.45', device: 'Chrome/Win11', status: 'investigating' },
  { id: 2, contributorId: 5, contributor: 'Carlos Mendez', reason: 'Duplicate content submission', severity: 'critical', detectedAt: '2026-03-28', ipAddress: '10.0.0.112', device: 'Firefox/MacOS', status: 'resolved' },
  { id: 3, contributorId: 7, contributor: 'Fatima Al-Hassan', reason: 'Abnormal posting speed', severity: 'low', detectedAt: '2026-03-31', ipAddress: '172.16.0.8', device: 'Safari/iPhone', status: 'monitoring' },
];

export const mockEmailTemplates = [
  { id: 1, name: 'Assignment Notification', subject: 'New linguistic research task for you', type: 'assignment', lastModified: '2026-03-15', usageCount: 1240 },
  { id: 2, name: 'Payment Confirmation', subject: 'Your payment has been processed', type: 'payment', lastModified: '2026-03-10', usageCount: 890 },
  { id: 3, name: 'Submission Rejected', subject: 'Your submission needs revision', type: 'rejection', lastModified: '2026-03-20', usageCount: 145 },
  { id: 4, name: 'Welcome Email', subject: 'Welcome to our linguistics panel!', type: 'onboarding', lastModified: '2026-02-01', usageCount: 156 },
  { id: 5, name: 'Submission Approved', subject: 'Great work! Submission approved', type: 'approval', lastModified: '2026-03-18', usageCount: 980 },
];

export const mockScrapedPosts = [
  { id: 1, submissionId: 2, word: 'frumious', subreddit: 'r/rant', author: 'u/maria_santos_ph', upvotes: 89, comments: 7, text: 'I was absolutely frumious when my coworker took credit for my project. There is literally no other word for that specific combination of fury and fuming...', snapshotTime: '2026-03-29 09:25', platform: 'Reddit', isDeleted: false },
  { id: 2, submissionId: 5, word: 'blorple', subreddit: 'r/CasualConversation', author: 'u/priya_patel_ind', upvotes: 512, comments: 42, text: 'Has anyone else experienced that blorple feeling when you find a $20 bill in an old jacket? It hit me this morning and made my whole day...', snapshotTime: '2026-03-28 16:35', platform: 'Reddit', isDeleted: false },
  { id: 3, submissionId: 1, word: 'blorple', subreddit: 'r/Showerthoughts', author: 'u/rahul_sh', upvotes: 234, comments: 18, text: 'The word blorple perfectly describes finding your high school diary. Pure unexpected delight mixed with existential dread.', snapshotTime: '2026-03-30 14:30', platform: 'Reddit', isDeleted: false },
];

export const activityLog = [
  { id: 1, user: 'Admin', action: 'Created word "thrumble"', entityType: 'word', timestamp: '2026-03-31 22:10', ip: '192.168.1.1' },
  { id: 2, user: 'Admin', action: 'Approved submission #2', entityType: 'submission', timestamp: '2026-03-31 21:45', ip: '192.168.1.1' },
  { id: 3, user: 'Admin', action: 'Assigned word "blorple" to Rahul Sharma', entityType: 'assignment', timestamp: '2026-03-31 20:30', ip: '192.168.1.1' },
  { id: 4, user: 'System', action: 'Auto-scraped post for submission #5', entityType: 'scraping', timestamp: '2026-03-31 19:55', ip: 'system' },
  { id: 5, user: 'Admin', action: 'Processed payment batch - $140', entityType: 'payment', timestamp: '2026-03-31 18:00', ip: '192.168.1.1' },
  { id: 6, user: 'Admin', action: 'Flagged contributor James O\'Brien', entityType: 'contributor', timestamp: '2026-03-31 16:20', ip: '192.168.1.1' },
];
