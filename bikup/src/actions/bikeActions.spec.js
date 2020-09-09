import { loadUserBikeList, loadBikeById, loadCompoById } from './bikeActions';
import dispatcher from '../dispatcher';
import axios from 'axios';
import actionTypes from './actionTypes';

jest.dontMock('./bikeActions');
jest.mock('axios');
jest.mock('../dispatcher');

describe('Bike Actions', () => {
	afterEach(() => {
		dispatcher.dispatch.mockClear();
		axios.get.mockClear();
	});

	it('Should not call axios get if no userId', async () => {
		axios.get.mockReturnValue(
			new Promise((resolve, reject) =>
				resolve({ bikes: [{ bikeName: 'alma' }] })
			)
		);

		await loadUserBikeList();

		const call = axios.get.mock.calls[0];

		expect(call).toBeUndefined();
	});

	it('Should get a bike list from /api/bikes with an userId', async () => {
		axios.get.mockReturnValue(
			new Promise((resolve, reject) =>
				resolve({ bikes: [{ bikeName: 'alma' }] })
			)
		);

		const userId = '51te2s3re1s42r3';
		await loadUserBikeList(userId);

		const call = axios.get.mock.calls[0][0];

		expect(call).toEqual('/api/bikes');
	});

	it('Should get a bike from /api/bikes/:bikeId with an userId', async () => {
		axios.get.mockReturnValue(
			new Promise((resolve, reject) => resolve({ bikeName: 'alma' }))
		);

		const bikeId = '51te2s3re1s42r3';
		await loadBikeById(bikeId);

		const call = axios.get.mock.calls[0][0];

		expect(call).toEqual(`/api/bikes/${bikeId}`);
	});

	it('Should get compo from /api/bikes/:bikeId with an userId', async () => {
		axios.get.mockReturnValue(
			new Promise((resolve, reject) => resolve({ compo: 'chain' }))
		);

		const bikeId = '51te2s3re1s42r3';
		const compoId = '23s4fd5s3f52';
		await loadCompoById(bikeId, compoId);

		const call = axios.get.mock.calls[0][0];

		expect(call).toEqual(`/api/bikes/${bikeId}/${compoId}`);
	});
});
