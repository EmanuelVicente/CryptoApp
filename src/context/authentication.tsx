// React
import React, { useCallback, useState, createContext } from "react";

interface AuthenticationContext {
  name: string;
  isAuthenticated: boolean;
  setAuthenticated: (name: string) => void;
}

const initialState = {
	name: "",
	isAuthenticated: false,
	setAuthenticated: () => {}
};

const AuthenticationContext = createContext<AuthenticationContext>({
	...initialState
});

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
	const [name, setName] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuthenticated = useCallback((nameL: string) => {
		setIsAuthenticated(true);
		setName(nameL);
	}, []);

	const value = {
		name,
		isAuthenticated,
		setAuthenticated
	};

	return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export { AuthenticationContext, AuthenticationProvider };
