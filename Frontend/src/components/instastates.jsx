import React from 'react'
import { Users, TrendingUp, MessageCircle } from 'lucide-react'

const Instastates = () => {

const stats = [
    { icon: Users, label: "10M+ Posts", value: "Generated" },
    { icon: TrendingUp, label: "85% Increase", value: "in Engagement" },
    { icon: MessageCircle, label: "50K+ Users", value: "Trust Us" }
  ];

  return (
    <div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-l from-[#f58529] via-[#dd2a7b] to-[#8134af] p-3 rounded-xl">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div></div>
  )
}

export default Instastates