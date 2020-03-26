import { gretch } from "gretchen";

type Success = {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: string;
  };
};

type Error = {
  success: boolean;
  error: {
    code: number;
    type: string;
    info: string;
  };
};

export default async function weatherstack(
  query: string
): Promise<Success["current"]> {
  const accessKey = process.env.WEATHERSTACK_API_KEY;
  const apiEndpoint = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${query}`;
  const response = await gretch<Success, Error>(apiEndpoint).json();
  if (response.error) throw new Error(response.error.error.info);
  return response.data.current;
}
