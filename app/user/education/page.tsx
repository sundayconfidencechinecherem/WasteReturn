// app/user/education/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  BookOpen,
  Award,
  CheckCircle,
  Play,
  ChevronRight,
  Search,
  Filter,
  Star,
  Clock,
  Recycle,
  Leaf,
  AlertTriangle,
  Smartphone,
  Truck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

// Mock education content
const mockGuides = [
  {
    id: 'G001',
    title: 'Complete Guide to Plastic Recycling',
    description: 'Learn how to identify, clean, and sort different types of plastics',
    category: 'plastics',
    duration: '5 min',
    level: 'beginner',
    points: 50,
    image: '🧴',
    completed: true,
    popular: true
  },
  {
    id: 'G002',
    title: 'Mastering Sorting Quality',
    description: 'Tips to achieve Gold level sorting and earn maximum points',
    category: 'sorting',
    duration: '8 min',
    level: 'advanced',
    points: 100,
    image: '⭐',
    completed: false,
    popular: true
  },
  {
    id: 'G003',
    title: 'Electronics Recycling: What You Need to Know',
    description: 'Safe handling and preparation of e-waste for recycling',
    category: 'electronics',
    duration: '6 min',
    level: 'intermediate',
    points: 75,
    image: '📱',
    completed: false,
    popular: false
  },
  {
    id: 'G004',
    title: 'Organic Waste Composting at Home',
    description: 'Turn your food scraps into valuable compost',
    category: 'organic',
    duration: '10 min',
    level: 'beginner',
    points: 60,
    image: '🍃',
    completed: true,
    popular: false
  },
  {
    id: 'G005',
    title: 'Understanding Points Multipliers',
    description: 'How to maximize your earnings through perfect sorting',
    category: 'points',
    duration: '4 min',
    level: 'intermediate',
    points: 80,
    image: '💰',
    completed: false,
    popular: true
  },
];

const mockQuizzes = [
  {
    id: 'Q001',
    title: 'Plastics Identification Quiz',
    questions: 10,
    points: 150,
    time: '5 min',
    difficulty: 'medium',
    completed: false,
    score: null
  },
  {
    id: 'Q002',
    title: 'Sorting Basics Test',
    questions: 8,
    points: 100,
    time: '4 min',
    difficulty: 'easy',
    completed: true,
    score: 100
  },
  {
    id: 'Q003',
    title: 'Advanced Sorting Challenge',
    questions: 15,
    points: 200,
    time: '8 min',
    difficulty: 'hard',
    completed: false,
    score: null
  },
];

const mockTips = [
  {
    id: 'T001',
    tip: 'Rinse containers before recycling to earn 1.2x points',
    category: 'bonus',
    icon: '✨'
  },
  {
    id: 'T002',
    tip: 'Flatten cardboard boxes to save space and earn bonus',
    category: 'tips',
    icon: '📦'
  },
  {
    id: 'T003',
    tip: 'Remove batteries from electronics - they cause fires!',
    category: 'safety',
    icon: '⚠️'
  },
  {
    id: 'T004',
    tip: 'Separate glass by color for higher points',
    category: 'sorting',
    icon: '🥤'
  },
];

export default function UserEducationPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'guides' | 'quizzes' | 'tips'>('guides');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGuides = mockGuides.filter(guide => {
    if (selectedCategory !== 'all' && guide.category !== selectedCategory) return false;
    if (search && !guide.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'plastics': return '🧴';
      case 'sorting': return '✓';
      case 'electronics': return '📱';
      case 'organic': return '🍃';
      case 'points': return '💰';
      default: return '📚';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/user/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Learn & Earn</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="mb-8 bg-gradient-to-r from-[#1976D2] to-[#0D47A1] text-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Learn to Sort Better</h2>
                <p className="text-sm opacity-90 mb-4">
                  Complete guides and quizzes to earn bonus points and master recycling
                </p>
                <Badge variant="gold">Earn up to 500 bonus points</Badge>
              </div>
              <Award className="w-16 h-16 opacity-75" />
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search guides and quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['guides', 'quizzes', 'tips'] as const).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'bg-[#1976D2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'guides' && (
          <>
            {/* Category Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'plastics', 'sorting', 'electronics', 'organic', 'points'].map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#1976D2] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                          {guide.image}
                        </div>
                        <div>
                          <h3 className="font-semibold">{guide.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="default" className="bg-gray-100">
                              {guide.level}
                            </Badge>
                            <span className="text-xs text-gray-500">{guide.duration}</span>
                          </div>
                        </div>
                      </div>
                      {guide.popular && (
                        <Badge variant="gold">Popular</Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{guide.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-green-600">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">{guide.points} pts</span>
                      </div>
                      {guide.completed ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Completed</span>
                        </div>
                      ) : (
                        <Button variant="primary" size="sm" className="gap-2">
                          <Play className="w-4 h-4" />
                          Start Guide
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            {mockQuizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{quiz.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="default" className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {quiz.time}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <BookOpen className="w-4 h-4" />
                          {quiz.questions} questions
                        </div>
                      </div>
                    </div>
                    <Badge variant="gold" className="text-sm">
                      {quiz.points} pts
                    </Badge>
                  </div>

                  {quiz.completed ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-600">Completed - Score: {quiz.score}%</span>
                      </div>
                      <Button variant="outline" size="sm">Retake</Button>
                    </div>
                  ) : (
                    <Button variant="primary" fullWidth>Start Quiz</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid md:grid-cols-2 gap-4">
            {mockTips.map((tip) => (
              <Card key={tip.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="text-sm text-gray-800">{tip.tip}</p>
                      <Badge variant="default" className="mt-2 bg-gray-100">
                        {tip.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#1976D2]">5</p>
                <p className="text-xs text-gray-500">Guides Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1976D2]">2</p>
                <p className="text-xs text-gray-500">Quizzes Passed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1976D2]">350</p>
                <p className="text-xs text-gray-500">Bonus Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}