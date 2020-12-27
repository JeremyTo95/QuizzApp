import HomeModel from './domain/HomeModel';
import QuestionModel from './domain/QuestionModel';

class RootStore {
	static type = {
		HOME_MODEL: 'homeModel',
		QUESTION_MODEL: 'questionModel'
	}

	constructor() {
		this.homeModel     = new HomeModel();
		this.questionModel = new QuestionModel();
	}

	getStores = () => ({
		[RootStore.type.HOME_MODEL]: this.homeModel,
		[RootStore.type.QUESTION_MODEL]: this.questionModel
	})
}

export default RootStore;