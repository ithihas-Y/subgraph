import { log } from '@graphprotocol/graph-ts'

import { DeployNewNftPool } from "../generated/PoolDeployer/PoolDeployer"
import { PoolDeployerEntity, NftPoolEntity } from "../generated/schema"

export function handleDeployNewNftPool(event: DeployNewNftPool): void {
  let id = event.params.nftPool.toHex();
  let pool = NftPoolEntity.load(id);

  log.info('handleDeployNewNftPool event.params.nftPool id {}', [id.toString()]);
  
  if (pool == null) {
    pool = new NftPoolEntity(id)
  }

  pool.save();

  let operator = pool.operator.toHex();
  let poolDeployer = PoolDeployerEntity.load(operator);

  log.info('handleDeployNewNftPool pool.operator {}', [operator.toString()]);

  if (!poolDeployer) {
    poolDeployer = new PoolDeployerEntity(operator);
  }

  poolDeployer.save()
}
