
export const updateName = async (name: string): Promise<string> => {
    const success = Math.random() > 0.5
    return await new Promise(
        (resolve, reject) => {
            setTimeout(
                () => {
                    if (success) {
                        resolve(`Name updated to ${name}`)
                    }
                    else {
                        reject(
                            new Error('Failed to update name')
                        )
                    }
                },
                1000
            )
        }
    )

}