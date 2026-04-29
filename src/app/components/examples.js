import Image from 'next/image'

const images = [
  {
    src:   '/donutmock.png',
    alt:   'Concept delivery app for a fictional donut company',
  },
  {
    src:   '/404.png',
    alt:   '404 page illustration iteration',
  },
  {
    src:   '/beerapp.gif',
    alt:   'Mobile app design – Beer app',
  },
  {
    src:   '/todoList.gif',
    alt:   'UI design – To do list mobile app',
  },
]

export default function ExampleGallery() {
  return (
    <div className="py-16">
      <div className="container mx-auto max-w-6xl px-4">

        <h2 className="mb-4 text-2xl font-normal tracking-tight text-slate-950 dark:text-white md:text-3xl">
          Additional work
        </h2>
        <p className="text-balance pb-6 pt-0 text-base font-normal text-slate-600 dark:text-slate-400">
          A selection of personal projects, exploratory ideas, and award submissions.
        </p>

        <div className="grid grid-cols-2 gap-4 pb-16 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
