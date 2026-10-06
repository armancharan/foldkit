import { Array, Option } from 'effect'
import { Update } from 'foldkit'
import type { Html, HtmlBuilder } from 'foldkit/html'
import { modifyFields } from 'foldkit/struct'

import { Applicant } from './applicant'
import { GotApplicantMessage, type Message } from './message'
import type { Model } from './model'

export const view = (model: Model, h: HtmlBuilder<Message>): Html =>
  h.ul(
    [h.Class('flex flex-col gap-4')],
    Array.map(model.applicants, applicant =>
      h.keyed('li')(
        applicant.id,
        [],
        [
          h.submodel({
            slotId: applicant.id,
            model: applicant.entry,
            view: Applicant.view,
            toParentMessage: message =>
              GotApplicantMessage({ entryId: applicant.id, message }),
          }),
        ],
      ),
    ),
  )

const foldApplicant = Update.foldChildren({
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
    GotApplicantMessage({ entryId, message }),
})

const update = (model: Model) => ({
  GotApplicantMessage: ({
    entryId,
    message,
  }: {
    entryId: string
    message: Applicant.Message
  }) => foldApplicant(model, entryId, message),
  LoadedApplicants: ({
    applicantIds,
  }: {
    applicantIds: ReadonlyArray<string>
  }) => ({
    model: modifyFields(model, {
      applicants: () =>
        Update.reconcileChildren(
          model.applicants,
          applicantIds,
          applicant => applicant.id,
          id => ({ id, entry: Applicant.init() }),
        ),
    }),
  }),
})
