-- AWS GenAI Pro Study Hub Database Schema

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  username TEXT,
  email TEXT UNIQUE NOT NULL,
  exam_date DATE,
  streak_count INT DEFAULT 0,
  last_study_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Flashcard progress table
CREATE TABLE flashcard_progress (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  last_seen TIMESTAMP,
  times_seen INT DEFAULT 0,
  PRIMARY KEY (user_id, card_id)
);

-- Question interactions table
CREATE TABLE question_interactions (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  is_saved BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  is_liked BOOLEAN DEFAULT FALSE,
  user_answer TEXT,
  is_correct BOOLEAN,
  answered_at TIMESTAMP,
  PRIMARY KEY (user_id, question_id)
);

-- Question reports table
CREATE TABLE question_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Exam results table
CREATE TABLE exam_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exam_id TEXT NOT NULL,
  mode TEXT NOT NULL,
  score FLOAT NOT NULL,
  time_taken INT,
  answers JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Domain scores table
CREATE TABLE domain_scores (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  domain_name TEXT NOT NULL,
  correct INT DEFAULT 0,
  total INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, domain_name)
);

-- Streak log table
CREATE TABLE streak_log (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  study_date DATE NOT NULL,
  minutes_studied INT DEFAULT 0,
  activity_type TEXT,
  PRIMARY KEY (user_id, study_date)
);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE streak_log ENABLE ROW LEVEL SECURITY;

-- Users: Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Flashcard progress: Users can only access their own progress
CREATE POLICY "Users can view own flashcard progress" ON flashcard_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcard progress" ON flashcard_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcard progress" ON flashcard_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Question interactions: Users can only access their own interactions
CREATE POLICY "Users can view own question interactions" ON question_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own question interactions" ON question_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own question interactions" ON question_interactions
  FOR UPDATE USING (auth.uid() = user_id);

-- Question reports: Users can create reports
CREATE POLICY "Users can create question reports" ON question_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Exam results: Users can only access their own results
CREATE POLICY "Users can view own exam results" ON exam_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam results" ON exam_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Domain scores: Users can only access their own scores
CREATE POLICY "Users can view own domain scores" ON domain_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own domain scores" ON domain_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own domain scores" ON domain_scores
  FOR UPDATE USING (auth.uid() = user_id);

-- Streak log: Users can only access their own logs
CREATE POLICY "Users can view own streak logs" ON streak_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak logs" ON streak_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak logs" ON streak_log
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_flashcard_progress_user_id ON flashcard_progress(user_id);
CREATE INDEX idx_flashcard_progress_status ON flashcard_progress(status);
CREATE INDEX idx_question_interactions_user_id ON question_interactions(user_id);
CREATE INDEX idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX idx_domain_scores_user_id ON domain_scores(user_id);
CREATE INDEX idx_streak_log_user_id ON streak_log(user_id);
