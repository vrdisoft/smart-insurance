import Link from 'next/link'

export const HomePage = () => {
  return (
    <>
      <header className="mb-10">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Smart Insurance Portal</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl">
          Welcome to the Smart Insurance Application Portal. Choose from various types of insurance and learn more about
          each before starting your application.
        </p>
      </header>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Explore Insurance Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              icon: '❤️',
              url: '/insurance-form/health',
              title: 'Health Insurance',
              desc: 'Provides coverage for medical expenses, doctor visits, and hospital stays. Essential for managing unexpected health issues.',
            },
            {
              icon: '🚗',
              url: '/insurance-form/car',
              title: 'Car Insurance',
              desc: 'Covers your vehicle against accidents, theft, and other damages. Protects you and others on the road.',
            },
            {
              icon: '🏠',
              url: '/insurance-form/home',
              title: 'Home Insurance',
              desc: 'Protects your property and belongings against damage or theft. A must-have for homeowners.',
            },
          ].map(({ icon, title, desc, url }) => (
            <Link key={title} href={url}>
              <div className="bg-white dark:bg-gray-800 cursor-pointer p-6 rounded-lg hover:shadow-lg transition shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)]">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
