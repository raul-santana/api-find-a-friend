import request from 'supertest'

import { app } from '@/app'
import { makePet } from '@/utils/test/make-pet'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/pets')
      .query({ state: org.state, city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and age', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet())

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ age: 2 }))

    const response = await request(app.server)
      .get('/pets')
      .query({ state: org.state, city: org.city, age: 2 })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'small' }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'medium' }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ size: 'large' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ state: org.state, city: org.city, size: 'small' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy level', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 1 }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ energy_level: 3 }))

    const response = await request(app.server)
      .get('/pets')
      .query({ state: org.state, city: org.city, energy_level: 1 })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and independency level', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ independency_level: 1 }))

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ independency_level: 3 }))

    const response = await request(app.server)
      .get('/pets')
      .query({ state: org.state, city: org.city, independency_level: 1 })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send(makePet({ environment: 'indoor' }))

    const response = await request(app.server)
      .get('/pets')
      .query({ state: org.state, city: org.city, environment: 'indoor' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and all filters', async () => {
    const { token, org } = await createAndAuthenticateOrg(app)

    const pets = [
      makePet({
        age: 1,
        size: 'small',
        energy_level: 1,
        environment: 'indoor',
      }),
      makePet({
        age: 2,
        size: 'medium',
        energy_level: 3,
        environment: 'outdoor',
      }),
      makePet({
        age: 1,
        size: 'large',
        energy_level: 4,
        environment: 'indoor',
      }),
      makePet({
        age: 4,
        size: 'small',
        energy_level: 1,
        environment: 'outdoor',
      }),
      makePet({
        age: 5,
        size: 'medium',
        energy_level: 3,
        environment: 'indoor',
      }),
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/pets')
          .set('Authorization', `Bearer ${token}`)
          .send(pet),
      ),
    )

    let response = await request(app.server).get('/pets').query({
      state: org.state,
      city: org.city,
      age: 1,
      size: 'small',
      energy_level: 1,
      environment: 'indoor',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/pets').query({
      state: org.state,
      city: org.city,
      size: 'medium',
    })

    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server).get('/pets').query({
      state: org.state,
      city: org.city,
      energy_level: 1,
    })

    expect(response.body.pets).toHaveLength(2)
  })
})
