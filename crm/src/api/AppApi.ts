import { AuthDataDto } from "../common/dto/AuthData";
import { TokenDto } from "../common/dto/TokenDto";
import { HttpService } from "../services/HttpService";

class AppApi extends HttpService {
    login(authData: AuthDataDto): Promise<TokenDto> {
        return this.post('login', authData);
    }

    refreshToken() {
        return this.get('refresh');
    }

    logout() {
        return this.post('logout', null);
    }

}

export default new AppApi();