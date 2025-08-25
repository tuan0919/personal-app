interface LoginRequestDTO {
    username: string;
    password: string;
}

interface LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
}

interface MeResponseDTO {
    id: string;
    username: string;
    role: string;
}

interface RefreshTokenRequestDTO {
    refreshToken: string;
}

interface RefreshTokenResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export type {
    LoginRequestDTO,
    LoginResponseDTO,
    MeResponseDTO,
    RefreshTokenRequestDTO,
    RefreshTokenResponseDTO,
}