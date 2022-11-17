// import { StarOutlined, UploadOutlined } from '@mui/icons-material';
import { StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, DatePicker, Form, Image, Input, InputNumber, Select, Upload, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css';
import ImgCrop from 'antd-img-crop';
import { NumericInput } from './NumericInput'
import * as moment from 'moment'
import { useParams } from 'react-router-dom';
import CallAPI from '../utils/CallAPI';
import { Backdrop } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import loading from '../public/Ripple-1s-200px.gif'

function BookDetail() {
  let { id } = useParams();

  const [image, setImage] = useState();
  const [book, setBook] = useState({});
  const [buttonName, setButtonName] = useState('ADD');
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    title: '',
    author: '',
    desc: '',
    page: '',
    publish: '',
    category: '',
  });
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (id) {
      CallAPI.getBook(+id).then(res => {
        setBook(res.data);
        setComponentDisabled(true);
        setButtonName('EDIT');
        setIsLoading(false)
      })

    }
  }, [id])

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
    setButtonName('SAVE')
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  // const handleButton = (e) => {
  //   if (buttonName === 'EDIT') {
  //     e.preventDefault();
  //     setButtonName('SAVE');
  //   }
    
  // }
  const handleSubmit = (e) =>{
    if (buttonName === 'EDIT') {
          e.preventDefault();
          setButtonName('SAVE');
        }
    if (buttonName === 'SAVE') {
      setIsLoading(true);
      console.log('save');
      setButtonName('EDIT');
    }
    
    if(buttonName === 'ADD'){
      setIsLoading(true);

    }
  }

  return (
    <>
      <Container>
        <Typography.Text style={{ fontSize: 40, marginTop: 160 }}>BOOK DETAIL</Typography.Text>
        <div className='middle'>
          {book && (<Form
            onSubmit={(e)=> handleSubmit(e)}
            name="basic"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
              onChange={handleInput}
            >
              <Input defaultValue={`${book?.title}`} style={{ width: 400 }} name='title'  />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: 'Please input your author!',
                },
                {
                  min: 2,
                  message: 'length must be greater than 1'
                }
              ]}
              onChange={handleInput}
            >
              <Input defaultValue={book?.author} name='author' style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
              label="Mô tả về sách"
              name="desc"
              onChange={handleInput}
            >
              <Input.TextArea style={{ width: 585 }} name='desc' />
            </Form.Item>

            <Form.Item
              label="Ngày phát hành"
              name="publish"
              rules={[
                {
                  required: true,
                  message: 'Please input date publish!',
                },
              ]}
            >
              <DatePicker
                name='publish' style={{ width: 400 }}
                // format={'yyyy-MM-dd'}
                onChange={({ value }) => setValues({ ...values, publish: moment(value).format('YYYY/MM/DD') })}
              />
            </Form.Item>

            <Form.Item
              label="Số trang"
              name="page"
              rules={[
                {
                  required: true,
                  message: 'Please input page number!',
                },
              ]}

            >
              <NumericInput style={{ width: 400 }} name="page" onChange={(value) => setValues({ ...values, page: value })} />
            </Form.Item>

            <Form.Item label="Thể loại" name='catecory'>
              <Select style={{ width: 400 }} name='category' onChange={(val) => setValues({ ...values, category: val })}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginLeft: 300 }}
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType= 'submit'>
                {buttonName}
              </Button>

              {/* <Button type="primary" style={{ marginLeft: 20, backgroundColor: 'green' }} onClick={()=> setComponentDisabled(false)}>
                Update
              </Button> */}
            </Form.Item>
          </Form>)
          }

          <Form className='form2' style={{ marginBottom: 80, marginRight: 200 }}>
            <ImgCrop rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form>
        </div>
        <Backdrop
          open={isLoading}
        >
          <img src={loading} alt="loading" className="loading" style={{ width: '50px' }} />
        </Backdrop>
        <ToastContainer />
      </Container>
    </>
  )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .middle  {
      margin-top: -100px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .ant-upload-list-picture-card-container {
      display: inline-block;
      width: 240px;
      height: 320px;
      margin: 0 8px 8px 0;
      vertical-align: top;
    }

    .ant-upload.ant-upload-select-picture-card {
      width: 240px;
      height: 320px;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      vertical-align: top;
      background-color: #fafafa;
      border: 1px dashed #d9d9d9;
      border-radius: 2px;
      cursor: pointer;
      transition: border-color 0.3s;
    }
`;
export default BookDetail