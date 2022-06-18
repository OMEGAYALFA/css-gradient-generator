import styles from './Sidebar.module.css';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import Direction from '../Direction/Direction';
import Footer from '../Footer/Footer';
import { randomColor, hexToRGB } from '../../utils/colors';
import GetButton from '../GetButton/GetButton';

export default function Sidebar({values, setValues, gradientCode}) {
  const [type, setType] = useState('linear'); 
  const [color1, setColor1] = useState(''); 
  const [color2, setColor2] = useState('');
  
  const randomizeColors = () => {
    setColor1(randomColor().toUpperCase());
    setColor2(randomColor().toUpperCase());
  };

  useEffect(() => {
    randomizeColors();
  }, []);

  useEffect(() => {
    const handleUpdateColors  = (data1, data2) => {
      setValues(prevValues => ({
        ...prevValues,
        firstColor: data1,
        secondColor: data2
      }))
    };

    handleUpdateColors(color1, color2);
  }, [color1, color2, setValues]);

  const fullGradientCode = `
  background: ${color1};
  background: -webkit-${gradientCode};
  background: -moz-${gradientCode};
  background: ${gradientCode};`;

  return (
    <section className={styles.sidebar}>
      <h1 className={styles.title}>Css Gradient Generator</h1>


      <p className={styles.subtitles}>Style</p>
      <div className={styles.type}>
        <Button text='Linear' handleClick={() => {
          setType('linear');
          setValues({
            ...values,
            gradType: 'linear',
          })
        }} />
        <Button text='Radial' handleClick={() => {
          setType('radial');
          setValues({
            ...values,
            gradType: 'radial',
          })
        }} />
      </div>

      <Direction type={type} values={values} setValues={setValues}/>

      <p className={styles.subtitles}>Colors</p>
      <div className={styles.colors}>
        <input
          type='color'
          className={styles.color}
          value={color1}
          onChange={e => setColor1(e.target.value)} />

        <input
          type='color'
          className={styles.color}
          value={color2}
          onChange={e => setColor2(e.target.value)} />

        <Button text='Random' handleClick={()=> randomizeColors()} />
      </div>


      <p className={styles.subtitles}>Output format</p>
      <div className={styles.output}>

        <Button text='Hex' handleClick={() => {
          setValues({
            ...values, 
            firstColor: color1,
            secondColor: color2
          })
          }}/>

        <Button text='Rgba' handleClick={() => {
          setValues({
            ...values, 
            firstColor: hexToRGB(color1),
            secondColor: hexToRGB(color2)
          })
          }}/>

      </div>

      <GetButton text='Get CSS' handleClick={() => navigator.clipboard.writeText(fullGradientCode)} />
      <GetButton text='Get Share Link' otherClass={styles.share}/>

      <Footer />
    </section>
  )
}
