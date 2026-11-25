# Global Rules

## Git Commit Convention

1. **Conventional Commits v1.0.0**: Every Git commit message across all projects must follow [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
    - Format: `<type>[optional scope]: <description>`
    - Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
    - Breaking changes: Append `!` after the type/scope (e.g., `feat!: ...`) and/or include a `BREAKING CHANGE:` footer.
    - Keep the subject concise, imperative, and lowercase without a trailing period.
2. **Co-Author Attribution**: Include the following trailer (preceded by a blank line) at the bottom of AI-assisted commit messages:

    ```text
    Co-authored-by: Gemini <gemini@google.com>
    ```

## Simplified Git-Flow Workflow

Adapted from [Git-Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.id_ID.html) into a streamlined workflow without a permanent `develop` branch:

1. **Single Main Branch (`main`)**:
    - `main` is the only long-lived branch and must always stay clean and release-ready.
    - Do not create a long-lived `dev` or `develop` branch.
2. **Short-Lived Branches by Purpose** (always branch from `main`, use lowercase kebab-case):
    - `feature/<name>` — new features, modules, or enhancements (e.g., `feature/core-functions`).
    - `hotfix/<name>` — urgent bug fixes or patches (e.g., `hotfix/auth-crash`); use `fix/<name>` for routine non-urgent bug fixes.
    - `docs/<name>` / `chore/<name>` — documentation, config, or maintenance changes (e.g., `docs/readme-update`).
    - `release/<version>` _(optional)_ — final preparation/stabilization before tagging a major/minor release (e.g., `release/v1.0.0`).
3. **Finish via Pull Request (Manual Branch Deletion)**:
    - Merge completed branches back into `main` via Pull Request (`<branch>` -> `main`), waiting for explicit user confirmation before merging.
    - Use the **browser agent** as the default tool to create and merge Pull Requests on GitHub (instead of requiring `gh` CLI).
    - Do **not** automatically delete merged branches (local or remote); keep them intact for rollback or debugging, and only delete a branch manually when the user explicitly asks to remove it.
4. **Release Tagging (SemVer)**:
    - Tag completed milestones or hotfixes on `main` using Semantic Versioning (`vMAJOR.MINOR.PATCH`, e.g., `v1.0.0`, `v1.1.0`, `v1.0.1`) and publish a corresponding GitHub Release when requested.
5. **Push Only When Requested**:
    - Only run `git push` when the user explicitly asks to push. Otherwise, leave changes or commits local for review first.

## Professional Code Review & PR Comments

1. **Pull Request Descriptions**: Write clear, structured PR descriptions covering **Summary / Context**, **Key Changes**, **Verification / Test Plan**, and any **Notes / Risks**.
2. **Professional Review Comments**: When reviewing code or leaving PR comments, write concise, objective, senior-engineer-grade feedback:
    - Clearly label severity (`[Blocker]`, `[Suggestion]`, or `[Nit]`) so priorities are unambiguous.
    - Reference exact files and line numbers, explain _why_ (correctness, type safety, edge cases, maintainability, or performance), and include a concrete recommended fix.
    - Acknowledge clean implementations and keep the tone constructive and respectful.
