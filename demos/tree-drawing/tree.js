export const root = {
  title: 'a',
  children: [
    {
      title: 'b',
      children: [
        {
          title: 'd',
          children: []
        },
        {
          title: 'e',
          children: [
            {
              title: 'h',
              children: [
                {
                  title: 'n',
                  children: []
                },
                {
                  title: 'o',
                  children: []
                }
              ]
            },
            {
              title: 'i',
              children: [
                {
                  title: 'p',
                  children: []
                }
              ]
            },
            {
              title: 'j',
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'c',
      children: [
        {
          title: 'f',
          children: []
        },
        {
          title: 'g',
          children: [
            {
              title: 'k',
              children: [
                {
                  title: 'q',
                  children: []
                }
              ]
            },
            {
              title: 'l',
              children: []
            },
            {
              title: 'm',
              children: [
                {
                  title: 'r',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
export const maxLevel = 5

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

export const trRoot = {
  title: 'a',
  left: {
    title: 'b',
    left: {
      title: 'd',
      left: {
        title: 'h',
        right: {
          title: 'l',
          right: { title: 'n' }
        }
      }
    },
    right: {
      title: 'e',
      left: { title: 'i' }
    }
  },
  right: {
    title: 'c',
    left: {
      title: 'f',
      left: {
        title: 'j',
        left: {
          title: 'm',
          left: {
            title: 'o'
          }
        }
      },
      right: { title: 'k' }
    },
    right: { title: 'g' }
  }
}

export const maryRoot = {
  title: 'o',
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
    }
  ]
}

export const lcaMaryRoot = {
  title: 'o',
  parent: null,
  children: [
    {
      title: 'e',
      parent: 'o',
      children: [
        { title: 'a', parent: 'e' },
        {
          title: 'd',
          parent: 'e',
          children: [
            { title: 'b', parent: 'd' },
            { title: 'c', parent: 'd' }
          ]
        }
      ]
    },
    {
      title: 'f',
      parent: 'o'
    },
    {
      title: 'n',
      parent: 'o',
      children: [
        { title: 'g', parent: 'n' },
        {
          title: 'm',
          parent: 'n',
          children: [
            { title: 'h', parent: 'm' },
            { title: 'i', parent: 'm' },
            { title: 'j', parent: 'm' },
            { title: 'k', parent: 'm' },
            { title: 'l', parent: 'm' }
          ]
        }
      ]
    }
  ]
}
