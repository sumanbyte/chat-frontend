import AppLayout from '../components/layout/AppLayout'
import Home from '../components/pageLayouts/Home';
const WrappedHome = AppLayout()(Home);
export default WrappedHome;