// Shared, three-free handle between the navigation layer (WorldTransit) and
// the world director (FiberWorld). While a navigation is in flight the world
// already moves toward the destination's shot.

type TransitTarget = { transit(): void };

export const worldBridge: { pendingPath: string | null; runtime: TransitTarget | null } = {
  pendingPath: null,
  runtime: null,
};

export function beginWorldTransit(pathname: string) {
  worldBridge.pendingPath = pathname;
  worldBridge.runtime?.transit();
}

export function endWorldTransit() {
  worldBridge.pendingPath = null;
  worldBridge.runtime?.transit();
}
