export default function makeOptionList(arr) {
  return Object.keys(arr).reduce((acc, next) => {
    acc.push(
      <option key={next} value={next}>
        {arr[next]}
      </option>
    );
    return acc;
  }, []);
}
