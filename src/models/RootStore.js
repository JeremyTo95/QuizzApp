import HomeModel from './domain/HomeModel';
import QuestionModel from './domain/QuestionModel';

/**
 * Root Store
 */
class RootStore {
	/**
	 * Model list
	 */
	static type = {
		HOME_MODEL: 'homeModel',
		QUESTION_MODEL: 'questionModel'
	}

	constructor() {
		this.homeModel     = new HomeModel();
		this.questionModel = new QuestionModel();
	}

	/**
	 * Return models
	 */
	getStores = () => ({
		[RootStore.type.HOME_MODEL]: this.homeModel,
		[RootStore.type.QUESTION_MODEL]: this.questionModel
	})
}

export default RootStore;