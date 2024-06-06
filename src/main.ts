import { ServerConfig } from './server.config';

const server = new ServerConfig();
server.start();
function removeDuplicates(arr: unknown[]): unknown[] {
    const map = new Map<unknown, number>();
    arr.forEach(elem => map.set(elem, (map.get(elem) || 0) + 1));
    return [...map.keys()];
  }
  
  function removeDuplicatesFromArrays(data: any): unknown {
    if (typeof data !== 'object' || data === null) 
      return data;
    
    if (Array.isArray(data)) 
      return removeDuplicates(
        data.map(item => removeDuplicatesFromArrays(item))
      );
    
    const cleanedObj: { [key: string]: unknown } = {};
    for (let key in data) 
      if (Object.prototype.hasOwnProperty.call(data, key)) 
        cleanedObj[key] = removeDuplicatesFromArrays(data[key]);
    
    return cleanedObj;
  }
  
  
  
  
  
  
  // Example usage
  const data = {
    name: 'Alice',
    hobbies: ['reading', 'reading', 'sports'],
    contact: {
      emails: ['alice@example.com', 'alice@example.com', 'alice@work.com'],
      phones: ['123-456-7890', '123-456-7890', null]
    },
    projects: [
      { title: 'Project 1', tags: ['tag1', 'tag2', 'tag1'] },
      { title: 'Project 2', tags: ['tag1', 'tag2', 'tag3'] },
      { title: 'Project 2', tags: ['tag1', 'tag2', 'tag3'] }
    ]
  };
  
  const cleanedData = removeDuplicatesFromArrays(data);
  console.log(JSON.stringify(cleanedData, null, 2));
  
  