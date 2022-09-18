import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchLaptopDetailsFail,
    fetchLaptopDetailsSuccess,
} from './laptopDetails.actions';
import { laptopDetailsTypes } from './laptopDetails.types';

export function* fetchLaptopDetails({ payload }) {
    try {
        const {
            data: { data },
        } = yield call(
            axios,
            `https://pcfy.redberryinternship.ge/api/laptop/${payload}?token=0f90a3c3ac54034b3e3675b2a4160ed7`
        );
        const responseBrand = yield call(
            axios,
            `https://pcfy.redberryinternship.ge/api/brands`
        );
        const positionResponse = yield call(
            axios,
            `https://pcfy.redberryinternship.ge/api/positions`
        );
        const teamsResponse = yield call(
            axios,
            `https://pcfy.redberryinternship.ge/api/teams`
        );
        const {
            user: { team_id, position_id, name, surname, phone_number, email },
            laptop: {
                brand_id,
                cpu,
                image,
                purchase_date,
                state,
                price,
                ram,
                hard_drive_type,
            },
        } = data;
        const brandName = responseBrand.data.data.find(
            (brandObj) => brandObj.id === brand_id
        );

        const positionName = positionResponse.data.data.find(
            (positionObj) => positionObj.id === position_id
        );

        const teamName = teamsResponse.data.data.find(
            (teamObj) => teamObj.id === team_id
        );

        // re-creating/modifying necessary objects to make them dynamic and iterable enough to use them in JSX
        const user = {
            სახელი: name,
            გვარი: surname,
            თიმი: teamName.name,
            პოზიცია: positionName.name,
            მეილი: email,
            'ტელ. ნომერი': phone_number,
        };

        const laptop = {
            'ლეპტოპის სახელი': data.laptop.name,
            'ლეპტოპის ბრენდი': brandName.name,
            RAM: ram,
            'მეხსიერების ტიპი': hard_drive_type,
            CPU: cpu.name,
            'CPU-ს ბირთვი': cpu.cores,
            'CPU-ს ნაკადი': cpu.threads,
        };

        const extra = {
            'ლეპტოპის მდგომარეობა': state === 'used' ? 'მეორადი' : 'ახალი',
            'ლეპტოპის ფასი': price,
            'შეძენის რიცხვი': !purchase_date
                ? 'არ არის მითითებული'
                : purchase_date,
        };
        yield put(fetchLaptopDetailsSuccess({ user, laptop, extra, image }));
    } catch (err) {
        yield put(fetchLaptopDetailsFail(err));
    }
}

export function* onLaptopDetailsFetchStart() {
    yield takeLatest(
        laptopDetailsTypes.FETCH_LAPTOP_DATA_START,
        fetchLaptopDetails
    );
}

export function* laptopDetailsSagas() {
    yield all([call(onLaptopDetailsFetchStart)]);
}
