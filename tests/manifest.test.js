'use strict'

const Manifest = require('../manifest')

describe('get data from manifest', () => {
  test('should able to get all data from manifest', () => {
    const manifest = Manifest.get('/')

    expect(manifest).toBeDefined()
    expect(manifest).toBeInstanceOf(Object)
  })

  test('should able to get meta data from config', () => {
    expect(Manifest.meta('/')).toMatch(/defines all configuration for project/i)
  })
})
