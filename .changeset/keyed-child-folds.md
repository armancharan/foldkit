---
'foldkit': minor
---

`Update.foldChildAt` folds one child selected by key. It leaves the parent Model unchanged when `readAt` returns `None`. For child OutMessages, `foldOutMessage` takes the key and returns a matcher whose handlers produce parent Steps. `toParentOutMessage` takes the key and returns a matcher that can forward a child OutMessage.

`Update.reconcileChildren` returns array entries in the requested key order. It reuses existing entries, creates an entry for each new key with `makeEntry`, and omits entries whose keys are absent. Repeated requested keys appear once. Fold child `init` or `boot` results separately when they include Commands or an OutMessage.

To migrate a repeated child from `foldChild` to `foldChildAt`, pass the key to the fold when handling its wrapper Message instead of creating a fold that closes over that key. This example uses an array of applicant entries.

**Before (`foldChild`):** Create a fold that closes over each entry's key.

```ts
const foldApplicant = (entryId: string) =>
  Update.foldChild({
    update: Applicant.update,
    read: (model: Model) =>
      Option.map(
        Array.findFirst(
          model.applicants,
          applicant => applicant.id === entryId,
        ),
        applicant => applicant.entry,
      ),
    write: (model, nextEntry) =>
      modifyFields(model, {
        applicants: Array.map(applicant =>
          applicant.id === entryId
            ? modifyFields(applicant, { entry: () => nextEntry })
            : applicant,
        ),
      }),
    toParentMessage: message =>
      Message.GotApplicantMessage({ entryId, message }),
  })

const update = (model: Model, message: Message) =>
  Message.match<Update.Return<Model, Message>>(message, {
    GotApplicantMessage: ({ entryId, message }) =>
      foldApplicant(entryId)(model, message),
  })
```

**After (`foldChildAt`):** Define one keyed fold. `readAt`, `writeAt`, and `toParentMessage` receive the key at dispatch time.

```ts
const foldApplicant = Update.foldChildAt({
  update: Applicant.update,
  readAt: (model: Model, entryId: string) =>
    Option.map(
      Array.findFirst(model.applicants, applicant => applicant.id === entryId),
      applicant => applicant.entry,
    ),
  writeAt: (model, entryId, nextEntry) =>
    modifyFields(model, {
      applicants: Array.map(applicant =>
        applicant.id === entryId
          ? modifyFields(applicant, { entry: () => nextEntry })
          : applicant,
      ),
    }),
  toParentMessage: (entryId, message) =>
    Message.GotApplicantMessage({ entryId, message }),
})

const update = (model: Model, message: Message) =>
  Message.match<Update.Return<Model, Message>>(message, {
    GotApplicantMessage: ({ entryId, message }) =>
      foldApplicant(model, entryId, message),
  })
```
