import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    title: 'Track your Nutrients',
    description: 'Explore the nutritional content of your meals with our Calculator. Easily track macronutrients and make informed dietary decisions for a healthier lifestyle.',
    icon: 'analytics',
    link: '/calculate'
  },
  {
    title: 'Get Recipe Recommendations',
    description: 'Receive personalized recipe suggestions based on your preferences. Elevate your culinary experience with diverse and delicious meal ideas tailored just for you.',
    icon: 'restaurant',
    link: '/recommend'
  },
  {
    title: 'Save Desired Recipes',
    description: 'Keep your favorite recipes organized and accessible. Save and revisit your desired recipes effortlessly, making meal planning a delightful and efficient experience.',
    icon: 'heart',
    link: '/saved'
  },
];


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Hero />
      <div className="p-6 text-center mt-12">
          <h1 className="text-4xl text-gray-700 font-bold mb-4 max-w-xl">Explore macros with our Calculator, receive personalized recipe recommendations and save your favorites. Elevate your wellness journey!</h1>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-16">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
  </div>
  )
}