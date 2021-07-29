import React from 'react';
import LoginPage from './login/LoginPage';
import Leftmenu from '../common/leftAccordion/Leftmenu';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import NewUser from './user/NewUser';
import ShowUser from './user/ShowUser';
import AddSession from './session/AddSession';
import ShowSession from './session/ShowSession';
import ViewProfile from './profile/ViewProfile';
import UpdatePassword from './profile/UpdatePassword';
import AddTrainee from './session/AddTrainee';
import AddScenario from './scenario/AddScenario';
import ShowScenario from './scenario/ShowScenario';
import AddQuestions from './questions/AddQuestions';
import ViewTraining from './training/ViewTraining';
import ViewMyTraining from './training/ViewMyTraining';
import AssignScores from './training/AssignScores';
import ViewScore from './training/ViewScore';
import CalculateScore from './training/CalculateScore';
import PrivateRoute from '../common/privateRoute/PrivateRoute';
import TrainerList from './reports/TrainerList';
import AdminList from './reports/AdminList';
import ListAll from './reports/ListAll';
import MyReport from './reports/MyReport';
import ViewSummary from './reports/ViewSummary';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div id='root-element'>
					<Header />
					<div className="main">
						<Route exact path='/' component={LoginPage} />
						<Route exact path='/login' component={LoginPage} />
						<Route path='/dashboard' component={Leftmenu} />
						<PrivateRoute exact path='/dashboard/addnewuser' component={NewUser} role={'admin'} />
						<PrivateRoute exact path='/dashboard/showallusers' component={ShowUser} role={'admin'} />
						<PrivateRoute exact path='/dashboard/addnewsessions' component={AddSession} role={'admin'} />
						<PrivateRoute exact path='/dashboard/listallsessions' component={ShowSession} role={'admin'} />
						<PrivateRoute exact path='/dashboard/viewprofile' component={ViewProfile} role={'all'} />
						<PrivateRoute exact path='/dashboard/updatepassword' component={UpdatePassword} role={'all'} />
						<PrivateRoute exact path='/dashboard/addtrainee' component={AddTrainee} role={'admin'} />
						<PrivateRoute exact path='/dashboard/addnewscenario' component={AddScenario} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/showallscenarios' component={ShowScenario} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/addquestions' component={AddQuestions} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/viewtrainings' component={ViewTraining} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/viewmytrainings' component={ViewMyTraining} role={'trainee'} />
						<PrivateRoute exact path='/dashboard/assignscores' component={AssignScores} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/viewscore' component={ViewScore} role={'trainee'} />
						<PrivateRoute exact path='/dashboard/calculatescore' component={CalculateScore} role={'trainee'} />
						<PrivateRoute exact path='/dashboard/list' component={TrainerList} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/listall' component={ListAll} role={'trainer'} />
						<PrivateRoute exact path='/dashboard/viewreport' component={AdminList} role={'admin'} />
						<PrivateRoute exact path='/dashboard/myreport' component={MyReport} role={'trainee'} />
						<PrivateRoute exact path='/dashboard/viewsummary' component={ViewSummary} role={'admin'} />
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
