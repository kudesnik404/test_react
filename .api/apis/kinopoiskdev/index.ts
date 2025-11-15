import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'kinopoiskdev/1.4 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Возвращает всю доступную информацию о сущности.
   *
   * @summary Поиск по id
   * @throws FetchError<401, types.MovieControllerFindOneV14Response401> Unauthorized
   * @throws FetchError<403, types.MovieControllerFindOneV14Response403> Forbidden
   * @throws FetchError<404, types.MovieControllerFindOneV14Response404> NotFound
   */
  movieController_findOneV1_4(metadata: types.MovieControllerFindOneV14MetadataParam): Promise<FetchResponse<200, types.MovieControllerFindOneV14Response200> | FetchResponse<number, types.MovieControllerFindOneV14ResponseDefault>> {
    return this.core.fetch('/v1.4/movie/{id}', 'get', metadata);
  }

  /**
   * Этот метод вернет список фильмов удовлетворяющих вашему запросу. <br> В ответе придут
   * поля указанные в параметре `selectFields`. Если его не указать, то вернутся только
   * дефолтные поля.
   *
   * @summary Универсальный поиск с фильтрами
   */
  movieController_findManyByQueryV1_4(metadata?: types.MovieControllerFindManyByQueryV14MetadataParam): Promise<FetchResponse<200, types.MovieControllerFindManyByQueryV14Response200>> {
    return this.core.fetch('/v1.4/movie', 'get', metadata);
  }

  /**
   * Этот метод вернет список фильмов которые подходят под ваш запрос.
   *
   * @summary Поиск фильмов по названию
   */
  movieController_searchMovieV1_4(metadata: types.MovieControllerSearchMovieV14MetadataParam): Promise<FetchResponse<200, types.MovieControllerSearchMovieV14Response200>> {
    return this.core.fetch('/v1.4/movie/search', 'get', metadata);
  }

  /**
   * Этот метод вернет рандомный тайтл из базы. Вы можете составить фильтр, чтобы получить
   * рандомный тайтл по вашим критериям.
   *
   * @summary Получить рандомный тайтл из базы
   */
  movieController_getRandomMovieV1_4(metadata?: types.MovieControllerGetRandomMovieV14MetadataParam): Promise<FetchResponse<200, types.MovieControllerGetRandomMovieV14Response200>> {
    return this.core.fetch('/v1.4/movie/random', 'get', metadata);
  }

  /**
   * Награды тайтлов
   *
   */
  movieController_findManyAwardsV1_4(metadata?: types.MovieControllerFindManyAwardsV14MetadataParam): Promise<FetchResponse<200, types.MovieControllerFindManyAwardsV14Response200>> {
    return this.core.fetch('/v1.4/movie/awards', 'get', metadata);
  }

  /**
   * Этот метод принимает только определенные поля, и возвращает по ним все доступные
   * значения.
   *
   * @summary Получить список стран, жанров, и т.д.
   */
  movieController_getPossibleValuesByFieldName(metadata: types.MovieControllerGetPossibleValuesByFieldNameMetadataParam): Promise<FetchResponse<200, types.MovieControllerGetPossibleValuesByFieldNameResponse200> | FetchResponse<number, types.MovieControllerGetPossibleValuesByFieldNameResponseDefault>> {
    return this.core.fetch('/v1/movie/possible-values-by-field', 'get', metadata);
  }

  /**
   * Поиск сезонов
   *
   */
  seasonController_findManyV1_4(metadata?: types.SeasonControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.SeasonControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/season', 'get', metadata);
  }

  /**
   * Этот метод предназначен для поиска персон по фильтрам. Он принимает множество
   * параметров, которые можно комбинировать между собой. Если вам нужен только поиск по
   * имени, используйте метод `Полнотекстовый поиск` (search). В этом методе также доступен
   * выбор полей. А в ответ приходит полная модель персоны.
   *
   * @summary Универсальный поиск с фильтрами
   */
  reviewController_findManyV1_4(metadata?: types.ReviewControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.ReviewControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/review', 'get', metadata);
  }

  /**
   * Возвращает всю доступную информацию о сущности.
   *
   * @summary Поиск по id
   * @throws FetchError<401, types.PersonControllerFindOneV14Response401> Unauthorized
   * @throws FetchError<403, types.PersonControllerFindOneV14Response403> Forbidden
   * @throws FetchError<404, types.PersonControllerFindOneV14Response404> NotFound
   */
  personController_findOneV1_4(metadata: types.PersonControllerFindOneV14MetadataParam): Promise<FetchResponse<200, types.PersonControllerFindOneV14Response200> | FetchResponse<number, types.PersonControllerFindOneV14ResponseDefault>> {
    return this.core.fetch('/v1.4/person/{id}', 'get', metadata);
  }

  /**
   * Этот метод вернет список персон удовлетворяющих вашему запросу. <br> В ответе придут
   * поля указанные в параметре `selectFields`. Если его не указать, то вернутся только
   * дефолтные поля.
   *
   * @summary Универсальный поиск с фильтрами
   */
  personController_findManyV1_4(metadata?: types.PersonControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.PersonControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/person', 'get', metadata);
  }

  /**
   * Этот метод вернет список персон которые подходят под ваш запрос.
   *
   * @summary Поиск актеров, режиссеров, и т.д по имени
   */
  personController_searchPersonV1_4(metadata: types.PersonControllerSearchPersonV14MetadataParam): Promise<FetchResponse<200, types.PersonControllerSearchPersonV14Response200>> {
    return this.core.fetch('/v1.4/person/search', 'get', metadata);
  }

  /**
   * Награды актеров
   *
   */
  personController_findManyAwardsV1_4(metadata?: types.PersonControllerFindManyAwardsV14MetadataParam): Promise<FetchResponse<200, types.PersonControllerFindManyAwardsV14Response200>> {
    return this.core.fetch('/v1.4/person/awards', 'get', metadata);
  }

  /**
   * Этот метод предназначен для поиска студий
   *
   * @summary Поиск студий
   */
  studioController_findManyV1_4(metadata?: types.StudioControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.StudioControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/studio', 'get', metadata);
  }

  /**
   * Этот метод предназначен для поиска ключевых слов
   *
   * @summary Поиск ключевых слов
   */
  keywordController_findManyV1_4(metadata?: types.KeywordControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.KeywordControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/keyword', 'get', metadata);
  }

  /**
   * Этот метод предназначен для поиска картинок которые привязаны к фильмам и сериалам
   *
   * @summary Поиск картинок
   */
  imageController_findManyV1_4(metadata?: types.ImageControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.ImageControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/image', 'get', metadata);
  }

  /**
   * Этот метод предназначен для поиска коллекций кино
   *
   * @summary Поиск коллекций
   */
  listController_findManyV1_4(metadata?: types.ListControllerFindManyV14MetadataParam): Promise<FetchResponse<200, types.ListControllerFindManyV14Response200>> {
    return this.core.fetch('/v1.4/list', 'get', metadata);
  }

  /**
   * Этот метод предназначен для поиска коллекции кино по slug
   *
   * @summary Поиск коллекции по slug
   */
  listController_findOneV1_4(metadata: types.ListControllerFindOneV14MetadataParam): Promise<FetchResponse<200, types.ListControllerFindOneV14Response200>> {
    return this.core.fetch('/v1.4/list/{slug}', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ImageControllerFindManyV14MetadataParam, ImageControllerFindManyV14Response200, KeywordControllerFindManyV14MetadataParam, KeywordControllerFindManyV14Response200, ListControllerFindManyV14MetadataParam, ListControllerFindManyV14Response200, ListControllerFindOneV14MetadataParam, ListControllerFindOneV14Response200, MovieControllerFindManyAwardsV14MetadataParam, MovieControllerFindManyAwardsV14Response200, MovieControllerFindManyByQueryV14MetadataParam, MovieControllerFindManyByQueryV14Response200, MovieControllerFindOneV14MetadataParam, MovieControllerFindOneV14Response200, MovieControllerFindOneV14Response401, MovieControllerFindOneV14Response403, MovieControllerFindOneV14Response404, MovieControllerFindOneV14ResponseDefault, MovieControllerGetPossibleValuesByFieldNameMetadataParam, MovieControllerGetPossibleValuesByFieldNameResponse200, MovieControllerGetPossibleValuesByFieldNameResponseDefault, MovieControllerGetRandomMovieV14MetadataParam, MovieControllerGetRandomMovieV14Response200, MovieControllerSearchMovieV14MetadataParam, MovieControllerSearchMovieV14Response200, PersonControllerFindManyAwardsV14MetadataParam, PersonControllerFindManyAwardsV14Response200, PersonControllerFindManyV14MetadataParam, PersonControllerFindManyV14Response200, PersonControllerFindOneV14MetadataParam, PersonControllerFindOneV14Response200, PersonControllerFindOneV14Response401, PersonControllerFindOneV14Response403, PersonControllerFindOneV14Response404, PersonControllerFindOneV14ResponseDefault, PersonControllerSearchPersonV14MetadataParam, PersonControllerSearchPersonV14Response200, ReviewControllerFindManyV14MetadataParam, ReviewControllerFindManyV14Response200, SeasonControllerFindManyV14MetadataParam, SeasonControllerFindManyV14Response200, StudioControllerFindManyV14MetadataParam, StudioControllerFindManyV14Response200 } from './types';
