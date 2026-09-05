import { Observable } from 'rxjs';
import { PortfolioData } from '../../shared/models';

/**
 * Data-access boundary for portfolio content.
 *
 * This abstract class is the *swap point* between data sources. Today it is
 * implemented by `JsonPortfolioRepository` (static JSON). Tomorrow it could be
 * a `HttpApiPortfolioRepository` hitting a REST API — with zero changes to the
 * services and components that depend on this abstraction.
 *
 * We use an abstract class (not just an interface) so it can double as a DI
 * token without a separate InjectionToken.
 */
export abstract class PortfolioRepository {
  abstract load(): Observable<PortfolioData>;
}
