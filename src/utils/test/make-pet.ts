import { faker } from '@faker-js/faker'

type Overwrite = {
  age?: number
  size?: string
  type?: string
  breed?: string
  energy_level?: number
  independency_level?: number
  environment?: string
  adoption_requirements?: string[]
  images_url?: string[]
}

export function makePet(overwrite?: Overwrite) {
  return {
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    type: overwrite?.type ?? 'dog',
    breed: overwrite?.breed ?? 'Labrador',
    age: overwrite?.age ?? faker.number.int({ min: 1, max: 15 }),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large', 'giant']),
    energy_level:
      overwrite?.energy_level ?? faker.number.int({ min: 1, max: 5 }),
    independency_level:
      overwrite?.independency_level ?? faker.number.int({ min: 1, max: 5 }),
    environment: overwrite?.environment ?? 'outdoor',
    adoption_requirements: overwrite?.adoption_requirements ?? [
      'Home visit required',
      'Fenced yard',
    ],
    images_url: overwrite?.images_url ?? [
      'https://example.com/dog-image1.jpg',
      'https://example.com/dog-image2.jpg',
      'https://example.com/dog-image3.jpg',
    ],
  }
}
