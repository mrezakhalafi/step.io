export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400">
              <span className="text-lg font-bold">📋</span>
            </div>
            <span className="font-semibold text-gray-800">taskly</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white">
              +
            </button>
            <div className="text-right">
              <div className="font-semibold text-gray-800">Mark Collins</div>
              <div className="text-xs text-gray-500">My settings</div>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-300">
              <img src="/api/placeholder/40/40" alt="Profile" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Weekly Pinned */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Weekly Pinned</h3>
                <button className="text-sm text-yellow-500">View all</button>
              </div>
              
              <div className="space-y-4">
                {/* Doctor Task */}
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="mb-2 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                      👨‍⚕️
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800">Call doctor for tests</h4>
                        <span className="text-yellow-500">✓</span>
                      </div>
                      <p className="text-sm text-gray-500">15 Mar 2020 - 9:00 AM</p>
                      <span className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-white">
                        personal
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Ask for blood tests and GYM certificate.</p>
                </div>

                {/* Birthday Task */}
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                    🎂
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Beatrice's bday</h4>
                    <p className="text-sm text-gray-500">22 Mar 2020</p>
                  </div>
                </div>

                {/* Add New Pin */}
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-white">
                    +
                  </div>
                  <h4 className="font-semibold text-gray-800">Add new weekly pin</h4>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">March, 2020</h3>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400">←</button>
                  <button className="text-gray-400">→</button>
                </div>
              </div>
              <div className="text-center text-sm text-yellow-500">Two weeks</div>
              
              <div className="mt-4 grid grid-cols-7 gap-2 text-center">
                <div className="text-xs font-medium text-gray-400">Mon</div>
                <div className="text-xs font-medium text-gray-400">Tue</div>
                <div className="text-xs font-medium text-gray-400">Wed</div>
                <div className="text-xs font-medium text-gray-400">Thu</div>
                <div className="text-xs font-medium text-gray-400">Fri</div>
                <div className="text-xs font-medium text-gray-400">Sat</div>
                <div className="text-xs font-medium text-gray-400">Sun</div>
                
                <div></div>
                <div className="py-2 text-sm">2</div>
                <div className="py-2 text-sm">3</div>
                <div className="py-2 text-sm">4</div>
                <div className="py-2 text-sm">5</div>
                <div className="py-2 text-sm">6</div>
                <div></div>
                
                <div className="py-2 text-sm">8</div>
                <div className="py-2 text-sm">9</div>
                <div className="py-2 text-sm text-gray-300">10</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-semibold text-white">11</div>
                <div className="py-2 text-sm">12</div>
                <div className="py-2 text-sm text-gray-300">13</div>
                <div className="py-2 text-sm text-gray-300">14</div>
              </div>
            </div>
          </div>

          {/* Center - Today's Schedule */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Today's schedule</h2>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold text-yellow-400">Thursday 11</h3>
                <button className="text-gray-400">←</button>
                <button className="text-gray-400">→</button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Wake up */}
              <div className="flex items-center gap-3 rounded-2xl bg-yellow-100 p-4">
                <span className="text-2xl">☀️</span>
                <span className="flex-1 font-medium text-gray-800">Wake up Buddy</span>
                <span className="text-sm font-medium text-gray-600">7:00 AM</span>
              </div>

              {/* Morning Yoga */}
              <div className="flex items-center gap-3 rounded-2xl bg-yellow-100 p-4">
                <span className="text-2xl">🧘</span>
                <span className="flex-1 font-medium text-gray-800">Morning Yoga</span>
                <span className="text-sm font-medium text-gray-600">8:00 AM</span>
              </div>

              {/* Daily Workout */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-2xl">🏋️</span>
                  <span className="flex-1 font-medium text-gray-800">Daily workout</span>
                  <span className="text-sm font-medium text-gray-600">9:00 AM</span>
                </div>
                <ul className="ml-10 space-y-1 text-sm text-gray-600">
                  <li>· Squat 10x3</li>
                  <li>· Push up 10x3</li>
                  <li>· Push up 10x3</li>
                </ul>
              </div>

              {/* Shift Project */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-2xl">👨‍💼</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Shift project kick off pt.1</div>
                    <div className="text-xs text-gray-500">10:00 AM</div>
                    <div className="text-xs text-gray-500">11:30 AM</div>
                  </div>
                </div>
                <p className="ml-10 text-sm text-gray-600">Zoom call, kick off with Elena and Jordan from Shift.</p>
                <div className="ml-10 mt-2 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full bg-pink-400"></div>
                    <div className="h-6 w-6 rounded-full bg-blue-400"></div>
                    <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
                  </div>
                  <span className="text-xs text-gray-500">+3 attendees</span>
                </div>
              </div>

              {/* Skype Sushi */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍱</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Skype Sushi</div>
                    <p className="text-sm text-gray-600">Lunch with Arly, light this quarantine with humor!</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">12:30 AM</span>
                </div>
              </div>

              {/* Dribbble Shot */}
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👨‍💼</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">Dribbble Shot</div>
                    <p className="text-sm text-gray-600">Working on a new shot !!</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Music Player */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-lg bg-red-900">
                  <img src="/api/placeholder/48/48" alt="Album" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Godzilla</div>
                  <div className="text-sm text-gray-500">Eminem</div>
                </div>
                <button className="text-gray-400">⋮</button>
              </div>
              
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                <span>03:15</span>
                <div className="h-1 flex-1 rounded-full bg-gray-200">
                  <div className="h-full w-1/2 rounded-full bg-gray-400"></div>
                </div>
                <span>00:45</span>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <button className="text-gray-600">🔀</button>
                <button className="text-gray-600">⏮</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white">▶</button>
                <button className="text-gray-600">⏭</button>
                <button className="text-gray-600">🔁</button>
              </div>
            </div>

            {/* Time & Weather */}
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-gray-800">8:48 AM</div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>☀️</span>
                <span>Now is almost Sunny</span>
              </div>
            </div>

            {/* Promo Card */}
            <div className="rounded-2xl bg-gray-50 p-6">
              <h3 className="mb-2 text-2xl font-bold leading-tight text-gray-800">
                Unsleash<br />the freelance<br />super power
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Unlimited tasks, premium features and much more.
              </p>
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">👨‍💼</div>
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-gray-800 transition-colors hover:bg-yellow-500">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}