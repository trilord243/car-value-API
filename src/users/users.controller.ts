import { Controller, Post, Body,Get,Patch,Param,Query, Delete, NotFoundException, ParseIntPipe,UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post('signup')
    createUser(@Body()  body: CreateUserDto ){
       this.usersService.create(body.email, body.password);


    }




    @Get('/:id')
    @UseInterceptors(SerializeInterceptor)
    async findUser(@Param('id',ParseIntPipe) id:string){
        const user = await  this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.usersService.find(email);
    }


    @Delete('/:id')
    removeUser(@Param('id',ParseIntPipe) id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id',ParseIntPipe )  id:string , @Body()body:UpdateUserDto  ){
        return this.usersService.update(parseInt(id), body);

    }


}
