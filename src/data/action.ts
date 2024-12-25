// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateName = async (name: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return name
}