import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">About Weapons Detection</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Advanced AI-powered weapon detection system designed to enhance public safety through intelligent
            surveillance and real-time threat identification.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 shadow-lg">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
                <p className="text-lg text-slate-600 mb-6">
                  To create safer public spaces through cutting-edge artificial intelligence and computer vision
                  technology. Our weapon detection system provides real-time monitoring and threat assessment to prevent
                  crime and protect communities.
                </p>
                <p className="text-lg text-slate-600">
                  We believe that technology should serve humanity by making our world safer, more secure, and more
                  peaceful for everyone.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Author Section */}
        <Card className="mb-16 shadow-lg">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Meet the Creator</h2>
              <p className="text-lg text-slate-600">The mind behind this innovative weapon detection system</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <img
                      src="/placeholder.svg?height=256&width=256"
                      alt="Josep Ronaldo Francis Siregar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Josep Ronaldo Francis Siregar</h3>
                <p className="text-lg text-slate-600 mb-6">AI Engineer & Security Technology Specialist</p>

                <div className="space-y-4 text-slate-600">
                  <p>
                    Josep is a passionate AI engineer with over 5 years of experience in computer vision and machine
                    learning. He specializes in developing developing cutting-edge security solutions that leverage
                    artificial intelligence to enhance public safety.
                  </p>

                  <p>
                    With a background in computer science and a deep understanding of security challenges in modern
                    society, Josep created this weapon detection system to bridge the gap between advanced technology
                    and practical security applications.
                  </p>

                  <p>
                    His expertise spans across deep learning, computer vision, real-time image processing, and security
                    system architecture. Josep is committed to using technology as a force for good, creating solutions
                    that protect communities while respecting privacy and ethical considerations.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Machine Learning
                  </span>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Computer Vision
                  </span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    AI Security
                  </span>
                  <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Public Safety
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">High Accuracy</h3>
              <p className="text-slate-600">Advanced AI algorithms with 99.5% accuracy in weapon detection</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Real-time Processing</h3>
              <p className="text-slate-600">Instant threat detection and alert system for immediate response</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Public Safety</h3>
              <p className="text-slate-600">Protecting communities and public spaces from potential threats</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Privacy Focused</h3>
              <p className="text-slate-600">Designed with privacy protection and ethical AI principles</p>
            </CardContent>
          </Card>
        </div>

        {/* Technology Section */}
        <Card className="shadow-lg mb-16">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Computer Vision</h3>
                <p className="text-slate-600">
                  Advanced image processing and pattern recognition to identify weapons in various lighting conditions
                  and angles.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Machine Learning</h3>
                <p className="text-slate-600">
                  Continuously learning AI models trained on extensive datasets to improve detection accuracy over time.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Real-time Analysis</h3>
                <p className="text-slate-600">
                  High-performance processing capabilities for instant threat assessment and immediate alert generation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Technologies Section */}
        <Card className="shadow-lg">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Technologies Used in This Project</h2>
            <p className="text-lg text-slate-600 text-center mb-12">
              This weapon detection system was built using modern web technologies and AI frameworks
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Frontend Technologies */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div>
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Next.js 15 (App Router)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      React 18
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      TypeScript
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Tailwind CSS
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* UI Components */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">U</span>
                    </div>
                    UI Components
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      shadcn/ui
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Radix UI
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Lucide React Icons
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Custom Components
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* AI & Detection */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    AI & Detection
                  </h3>
                  <ul className="space-y-2 text-purple-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      TensorFlow.js
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      YOLO v8 Model
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      OpenCV.js
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Custom CNN Models
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Backend & Processing */}
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">B</span>
                    </div>
                    Backend & API
                  </h3>
                  <ul className="space-y-2 text-orange-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Next.js API Routes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Server Actions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      File Upload API
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Image Processing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Development Tools */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">D</span>
                    </div>
                    Development
                  </h3>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      ESLint & Prettier
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Git Version Control
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      VS Code
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Node.js Runtime
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Deployment */}
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">P</span>
                    </div>
                    Deployment
                  </h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      Vercel Platform
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      Edge Functions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      CDN Optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      Auto Scaling
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Technical Highlights */}
            <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 text-center">Technical Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">99.5%</div>
                  <div className="text-sm opacity-90">Detection Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">{"<"}50ms</div>
                  <div className="text-sm opacity-90">Processing Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm opacity-90">Real-time Monitoring</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
