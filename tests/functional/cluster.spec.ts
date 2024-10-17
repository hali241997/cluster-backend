import { TimezoneEnum } from '#models/types'
import { test } from '@japa/runner'
import fs from 'node:fs'
import sinon from 'sinon'

test.group('ClustersController', (group) => {
  // mocking file reading
  let readFileSyncStub: sinon.SinonStub

  // setup file before testing starts
  group.setup(() => {
    // Stub fs.readFileSync to return mock data
    const mockData = JSON.stringify({
      name: 'Test Cluster',
      id: '1',
      data: [
        {
          // Oct 17, 2023
          date: '2023-10-17T18:52:14.818Z',
          readIops: 97532.9196,
          writeIops: 464.5457,
          readThroughput: 537368719.6922,
          writeThroughput: 374302842.673,
        },
        {
          // Sep 30, 2024
          date: '2024-09-30T18:52:14.818Z',
          readIops: 38667.2449,
          writeIops: 309.892,
          readThroughput: 278455818.8811,
          writeThroughput: 195560689.4013,
        },
        {
          // Oct 16, 2024
          date: '2024-10-16T18:52:14.818Z',
          readIops: 23022.661,
          writeIops: 889.7644,
          readThroughput: 969125109.9874,
          writeThroughput: 641587180.4144,
        },
      ],
    })

    // mock file reading
    readFileSyncStub = sinon.stub(fs, 'readFileSync').returns(mockData)
  })

  test('should filter date correctly for week timezone', async ({ client, assert }) => {
    const response = await client
      .get('/api/getTimeSeries')
      .qs({ timezone: TimezoneEnum.week })
      .send()

    response.assertStatus(200)
    assert.equal(response.body().id, '1')
    assert.lengthOf(response.body().data, 1)
  })

  test('should filter date correctly for month timezone', async ({ client, assert }) => {
    const response = await client
      .get('/api/getTimeSeries')
      .qs({ timezone: TimezoneEnum.month })
      .send()

    response.assertStatus(200)
    assert.equal(response.body().id, '1')
    assert.lengthOf(response.body().data, 2)
  })

  test('should filter date correctly for year timezone', async ({ client, assert }) => {
    const response = await client
      .get('/api/getTimeSeries')
      .qs({ timezone: TimezoneEnum.year })
      .send()

    response.assertStatus(200)
    assert.equal(response.body().id, '1')
    assert.lengthOf(response.body().data, 2)
  })

  group.teardown(() => {
    // Restore the original behavior of fs.readFileSync after tests
    readFileSyncStub.restore()
  })
})
