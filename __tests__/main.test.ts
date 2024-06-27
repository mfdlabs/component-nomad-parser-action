/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import path from 'path'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>
let warningMock: jest.SpiedFunction<typeof core.warning>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    warningMock = jest.spyOn(core, 'warning').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
  })

  it('should run the action', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'components':
          return JSON.stringify({
            'grid-bot:2024.06.22-01.02.19-0bf8131': path.join(
              __dirname,
              'test.component.yaml',
            ),
          })
        case 'datacenters':
          return 'cou1'
        default:
          return ''
      }
    })

    debugMock.mockImplementation((message: string) => {
      console.log(`DEBUG: ${message}`)
    })

    warningMock.mockImplementation((message: string | Error) => {
      console.log(`WARNING: ${message}`)
    })

    setFailedMock.mockImplementation((message: string | Error) => {
      console.log(`ERROR: ${message}`)
    })

    process.env.VERSION = '2024.06.22-01.02.19-0bf8131'
    process.env.NOMAD_ENVIRONMENT = 'production'
    process.env.NOMAD_SHORT_ENVIRONMENT = 'prod'

    await main.run()

    expect(runMock).toHaveBeenCalled()
  })
})
