'use strict'

const Lab = require('lab')
const Code = require('code')
const Manifest = require('../manifest')

const lab = exports.lab = Lab.script()
const { describe, it } = lab
const expect = Code.expect

describe('Manifest file', () => {
  it('gets config data', (done) => {
    expect(Manifest.get('/')).to.be.an.object()
    done()
  })

  it('gets config meta data', (done) => {
    expect(Manifest.meta('/')).to.match(/defines all configuration for project/i)
    done()
  })
})
