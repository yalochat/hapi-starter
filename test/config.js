'use strict'

const Lab = require('lab')
const Code = require('code')
const Config = require('../config')

const lab = exports.lab = Lab.script()
const { describe, it } = lab
const expect = Code.expect

describe('Config file', () => {
  it('gets config data', done => {
    expect(Config.get('/')).to.be.an.object()
    done()
  })

  it('gets config meta data', done => {
    expect(Config.meta('/')).to.match(/defines all configuration for project/i)
    done()
  })

  it('gets config for logger without set in environment variable', done => {
    expect(Config.get('/logger/options')).to.equal({ console: false })
    done()
  })
})
