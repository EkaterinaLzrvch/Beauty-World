import { AuthForm } from "../../components/AuthForm";
import { useAuth } from "../../contexts/AuthContext";

export function LoginPage() {
    const { login } = useAuth();
    return (
        <>
            <AuthForm onLogin={login} />
        </>
    );
}