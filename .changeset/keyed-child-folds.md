---
'foldkit': minor
---

`Update.foldChildren` folds one child in a collection by key. `readAt` returning `None` leaves the parent unchanged. `Update.reconcileChildren` keeps a child whose id remains, inits an id that arrived, and drops an id that left.
