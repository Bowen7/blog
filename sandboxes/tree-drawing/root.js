export const binaryRoot = {
  title: 'a',
  left: {
    title: 'b',
    left: {
      title: 'd'
    },
    right: {
      title: 'e',
      left: { title: 'g' },
      right: { title: 'h' }
    }
  },
  right: {
    title: 'c',
    right: {
      title: 'f',
      right: {
        title: 'i',
        left: {
          title: 'j',
          left: { title: 'k', left: { title: 'm' }, right: { title: 'n' } },
          right: { title: 'l' }
        }
      }
    }
  }
}
export const binaryMaxLevel = 7

export const maryRoot = {
  title: 'r',
  children: [
    {
      title: 'e',
      children: [
        { title: 'a' },
        { title: 'd', children: [{ title: 'b' }, { title: 'c' }] }
      ]
    },
    { title: 'f' },
    {
      title: 'n',
      children: [
        { title: 'g' },
        {
          title: 'm',
          children: [
            { title: 'h' },
            { title: 'i' },
            { title: 'j' },
            { title: 'k' },
            { title: 'l' }
          ]
        }
      ]
    },
    { title: 'q', children: [{ title: 'p', children: [{ title: 'o' }] }] }
  ]
}
export const maryMaxLevel = 5
