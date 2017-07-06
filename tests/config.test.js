'use strict'

const Config = require('../config')

describe('get data from config', () => {
  test('should able to get all data from config', () => {
    const config = Config.get('/')

    expect(config).toBeDefined()
    expect(config).toBeInstanceOf(Object)
  })

  test('should able to get meta data from config', () => {
    expect(Config.meta('/')).toMatch(/defines all configuration for project/i)
  })

  test('should able to get logger configuration without set environment variable', () => {
    expect(Config.get('/logger/options')).toEqual({ console: false })
  })
})
