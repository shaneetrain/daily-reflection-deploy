import { Provider } from "./context/index";
import FirebaseAuthState from "./context/FirebaseAuthState";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import { HashRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider>
            <FirebaseAuthState>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        <Navigation />
                        <ToastContainer />
                    </Router>
                </QueryClientProvider>
            </FirebaseAuthState>
        </Provider>
    );
}

export default App;
